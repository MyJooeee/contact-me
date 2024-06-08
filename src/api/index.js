const fetchApi = (url, authOptions = {}, callback = null) => {
  return fetch(url, authOptions)
    .then((res) => res.json())
    .then(
      (result) => {
        return result
      },
      (error) => {
          if (callback) callback(error)
      }
    );
};

export { fetchApi };
  