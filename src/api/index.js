const getSpotifyAccessToken = (callback) => {
  const url = process.env.REACT_APP_SPOTIFY_ENDPOINT;
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  const authOptions = {
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials',
    json: true
  };

  return fetch(url, authOptions)
    .then((res) => res.json())
    .then(
      (result) => {
        return result
      },
      (error) => {
        callback(error)
      }
    );
};

export { getSpotifyAccessToken };
  