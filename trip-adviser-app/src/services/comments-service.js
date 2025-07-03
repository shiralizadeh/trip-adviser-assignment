import { API_ENDPOINT } from '../configs.js';

async function addComment(placeId, comment) {
  const response = await fetch(`${API_ENDPOINT}/places/${placeId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  const posts = await response.json();

  return posts;
}

async function getReviewComments() {
  const response = await fetch(`${API_ENDPOINT}/review-comments`);

  const posts = await response.json();

  return posts;
}

async function approveComment(placeId, commentId, isApproved) {
  const response = await fetch(`${API_ENDPOINT}/approve-comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      placeId,
      commentId,
      isApproved,
    }),
  });

  const posts = await response.json();

  return posts;
}

export default {
  addComment,
  getReviewComments,
  approveComment,
};
