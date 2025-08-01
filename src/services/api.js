const BASE_URL = 'http://localhost:3000';

export const fetchFaceDetection = (imageUrl) => {
  return fetch(`${BASE_URL}/api`, {
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
  return fetch(`${BASE_URL}/image`, {
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