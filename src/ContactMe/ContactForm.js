import React, { useState, useEffect, useRef } from 'react';
import alphaEncryptor from '../utils';
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';

const MSERVICE_ID = process.env.REACT_APP_MSERVICE_ID;
const MTEMPLATE_ID = process.env.REACT_APP_MTEMPLATE_ID;
const MPUBLIC_KEY = process.env.REACT_APP_MPUBLIC_KEY;
const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY;
const KEY_Z = process.env.REACT_APP_KEY_Z;

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const containsSuspiciousContent = (text) => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /onclick/i,
    /http:\/\//i,
    /https:\/\//i
  ];
  return suspiciousPatterns.some(pattern => pattern.test(text));
};

const canSendEmail = () => {
  try {
    // Récupération du timestamp avec la méthode sécurisée getFromStorage
    const lastSentTimeStr = alphaEncryptor.getFromStorage(KEY_Z);
    
    // Si aucun timestamp n'existe ou si le déchiffrement a échoué, l'email peut être envoyé
    if (!lastSentTimeStr) return true;
    
    try {
      // Vérification du délai (1 heure = 3600000ms)
      const lastSent = new Date(lastSentTimeStr);
      const now = new Date();
      return (now - lastSent) >= 3600000;
    } catch (dateError) {
      console.error('Format de date invalide:', dateError);
      // En cas d'erreur de format de date, supprimer la valeur corrompue
      localStorage.removeItem(KEY_Z);
      return true;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du délai d\'envoi:', error);
    // En cas d'erreur, on permet l'envoi pour éviter de bloquer l'utilisateur
    return true;
  }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    emailjs.init(MPUBLIC_KEY);
  }, []);

  const handleRecaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!captchaToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Please verify that you are not a robot'
      });
      return false;
    }

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.name.length > 30) {
      newErrors.name = 'Name must not exceed 30 characters';
    }
    if (formData.subject.length > 50) {
      newErrors.subject = 'Subject must not exceed 50 characters';
    }
    if (formData.message.length > 250) {
      newErrors.message = 'Message must not exceed 250 characters';
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (containsSuspiciousContent(value)) {
        newErrors[key] = 'Unauthorized content detected';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSendEmail()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please wait at least one hour between emails'
      });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        'g-recaptcha-response': captchaToken
      };

      const response = await emailjs.send(
        MSERVICE_ID,
        MTEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        // Enregistrement sécurisé de l'horodatage avec la nouvelle méthode saveToStorage
        const saveResult = alphaEncryptor.saveToStorage(KEY_Z, new Date().toISOString());
        
        if (!saveResult) {
          console.warn('Avertissement: Impossible d\'enregistrer le timestamp d\'envoi');
        }
        
        // Réinitialisation du formulaire
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset reCAPTCHA
        recaptchaRef.current.reset();
        setCaptchaToken(null);
        
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully!'
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Contact me :)
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          disabled={isSubmitting}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          disabled={isSubmitting}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={!!errors.subject}
          helperText={errors.subject}
          disabled={isSubmitting}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Message"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          error={!!errors.message}
          helperText={errors.message}
          disabled={isSubmitting}
        />

        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_KEY}
            onChange={handleRecaptchaChange}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Send'
          )}
        </Button>

        {submitStatus && (
          <Alert 
            severity={submitStatus.type} 
            sx={{ mt: 2 }}
            onClose={() => setSubmitStatus(null)}
          >
            {submitStatus.message}
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default ContactForm;