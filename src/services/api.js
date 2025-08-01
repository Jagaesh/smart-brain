const API_URL = import.meta.env.VITE_API_URL;

export const fetchFaceDetection = (imageUrl) => {
  return fetch(`${API_URL}/api`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la détection faciale');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erreur réseau ou HTTP', error);
      throw error;
    });
};

export const updateUserEntries = (userId) => {
  return fetch(`${API_URL}/image`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: userId })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du compteur');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erreur réseau ou HTTP', error);
      throw error;
    });
};