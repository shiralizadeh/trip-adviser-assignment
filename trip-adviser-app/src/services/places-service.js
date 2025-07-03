import { API_ENDPOINT } from '../configs.js';

async function getPlaces() {
  const response = await fetch(`${API_ENDPOINT}/places`);

  const posts = await response.json();

  return posts;
}

async function getPlace(id) {
  const response = await fetch(`${API_ENDPOINT}/places/${id}`);

  const posts = await response.json();

  return posts;
}

export default {
  getPlaces,
  getPlace,
};
