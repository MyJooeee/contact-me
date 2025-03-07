import CryptoJS from 'crypto-js';

/**
 * Classe sécurisée pour le chiffrement et déchiffrement
 */
class AlphaEncryptor {
  constructor() {
    this.encryptionKey = process.env.REACT_APP_ALPHA;
    
    if (!this.encryptionKey) {
      console.error('Erreur: Clé de chiffrement non définie dans .env');
    }
  }
  
  /**
   * Chiffre une valeur
   * @param {string} value - Valeur à chiffrer
   * @returns {string} - Valeur chiffrée
   */
  encryptAlpha(value) {
    if (!this.encryptionKey) {
      throw new Error('Clé de chiffrement non configurée');
    }
    
    if (!value) {
      throw new Error('Valeur à chiffrer non définie');
    }
    
    try {
      const encrypted = CryptoJS.AES.encrypt(value, this.encryptionKey).toString();
      return encrypted;
    } catch (error) {
      console.error('Erreur lors du chiffrement:', error);
      throw error;
    }
  }
  
  /**
   * Déchiffre une valeur précédemment chiffrée
   * @param {string} encryptedValue - Valeur chiffrée
   * @returns {string} - Valeur déchiffrée
   */
  decryptAlpha(encryptedValue) {
    if (!this.encryptionKey) {
      throw new Error('Clé de déchiffrement non configurée');
    }
    
    if (!encryptedValue) {
      throw new Error('Valeur à déchiffrer non définie');
    }
    
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, this.encryptionKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decrypted) {
        throw new Error('Échec de déchiffrement - résultat vide');
      }
      
      return decrypted;
    } catch (error) {
      console.error('Erreur lors du déchiffrement:', error);
      throw new Error('Échec de déchiffrement');
    }
  }
  
  /**
   * Déchiffre une valeur et effectue un decodeURIComponent en toute sécurité
   * Version robuste qui gère les erreurs de format UTF-8
   * @param {string} encryptedValue - Valeur chiffrée
   * @returns {string|null} - Valeur déchiffrée et décodée, ou null en cas d'erreur
   */
  decryptAndDecode(encryptedValue) {
    try {
      if (!encryptedValue) {
        return null;
      }
      
      // Vérifier si la valeur a besoin d'être décodée avant déchiffrement
      let valueToDecrypt = encryptedValue;
      
      // Stratégie 1: Déchiffrer directement puis décoder
      try {
        // Tentative standard de déchiffrement
        const decrypted = this.safeDecrypt(valueToDecrypt);
        
        if (!decrypted) {
          throw new Error('Déchiffrement direct échoué');
        }
        
        // Tenter de décoder si c'est une URI encodée
        try {
          return decodeURIComponent(decrypted);
        } catch (uriError) {
          // Si ce n'est pas une URI encodée, retourner la valeur déchiffrée
          return decrypted;
        }
      } catch (firstAttemptError) {
        // Stratégie 2: Décoder d'abord, puis déchiffrer
        try {
          // Essayer de décoder l'URI avant de déchiffrer
          const decodedValue = decodeURIComponent(encryptedValue);
          const decrypted = this.safeDecrypt(decodedValue);
          
          if (!decrypted) {
            throw new Error('Déchiffrement après décodage échoué');
          }
          
          return decrypted;
        } catch (secondAttemptError) {
          // Stratégie 3: Dernière tentative avec différentes combinaisons
          try {
            // Essayer d'abord de décoder deux fois (cas où double encodage)
            const doubleDecodedValue = decodeURIComponent(decodeURIComponent(encryptedValue));
            return this.safeDecrypt(doubleDecodedValue);
          } catch (finalError) {
            console.error('Toutes les tentatives de déchiffrement ont échoué');
            return null;
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors du déchiffrement ou décodage:', error);
      return null;
    }
  }
  
  /**
   * Méthode interne pour déchiffrer de manière sécurisée sans lancer d'exception
   * @private
   * @param {string} value - Valeur à déchiffrer
   * @returns {string|null} - Valeur déchiffrée ou null en cas d'erreur
   */
  safeDecrypt(value) {
    try {
      if (!value) return null;
      
      const bytes = CryptoJS.AES.decrypt(value, this.encryptionKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      
      return decrypted || null;
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Enregistre une valeur chiffrée dans le localStorage avec encodage cohérent
   * @param {string} key - Clé de stockage 
   * @param {string} value - Valeur à chiffrer et stocker
   * @returns {boolean} - Succès de l'opération
   */
  saveToStorage(key, value) {
    try {
      if (!key || !value) {
        return false;
      }
      
      // 1. Chiffrer la valeur
      const encrypted = this.encryptAlpha(value);
      
      // 2. Encoder en URI pour éviter les problèmes de caractères spéciaux
      localStorage.setItem(key, encodeURIComponent(encrypted));
      
      // Vérification que le stockage a fonctionné
      return !!localStorage.getItem(key);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement dans le localStorage:', error);
      return false;
    }
  }
  
  /**
   * Récupère et déchiffre une valeur du localStorage
   * @param {string} key - Clé de stockage
   * @returns {string|null} - Valeur déchiffrée ou null
   */
  getFromStorage(key) {
    try {
      const storedValue = localStorage.getItem(key);
      
      if (!storedValue) {
        return null;
      }
      
      // Tenter plusieurs approches pour récupérer la valeur correctement
      return this.decryptAndDecode(storedValue);
    } catch (error) {
      console.error('Erreur lors de la récupération depuis le localStorage:', error);
      return null;
    }
  }
  
  /**
   * Test le processus complet de chiffrement/déchiffrement
   * @param {string} testValue - Valeur à tester
   * @returns {Object} Résultats du test
   */
  test(testValue) {
    console.log("=== TEST DE CHIFFREMENT/DÉCHIFFREMENT ===");
    console.log("Clé de chiffrement présente:", !!this.encryptionKey);
    
    try {
      const encrypted = this.encryptAlpha(testValue);
      console.log("Valeur chiffrée:", encrypted);
      
      const decrypted = this.decryptAlpha(encrypted);
      console.log("Valeur déchiffrée:", decrypted);
      console.log("Correspondance:", testValue === decrypted);
      
      // Test du localStorage
      const testKey = "_test_alpha_encryptor_key";
      console.log("Test de localStorage:");
      
      const saveResult = this.saveToStorage(testKey, testValue);
      console.log("- Sauvegarde réussie:", saveResult);
      
      const retrievedValue = this.getFromStorage(testKey);
      console.log("- Valeur récupérée:", retrievedValue);
      console.log("- Correspondance:", testValue === retrievedValue);
      
      // Nettoyer après le test
      localStorage.removeItem(testKey);
      
      return {
        original: testValue,
        encrypted: encrypted,
        decrypted: decrypted,
        storage: {
          saved: saveResult,
          retrieved: retrievedValue,
          success: testValue === retrievedValue
        },
        success: testValue === decrypted && testValue === retrievedValue
      };
    } catch (error) {
      console.error("Erreur lors du test:", error);
      return {
        error: error.message,
        success: false
      };
    }
  }
}

const alphaEncryptor = new AlphaEncryptor();

export default alphaEncryptor;