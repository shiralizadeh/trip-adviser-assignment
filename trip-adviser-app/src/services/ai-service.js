let languageModel = null;

try {
  if (typeof LanguageModel === 'function') {
    // eslint-disable-next-line no-undef
    languageModel = await LanguageModel.create();
  }
} catch (error) {
  console.error('Error initializing language model:', error);
}

async function getCommentAIReview(comment) {
  if (!languageModel) {
    return 'AI language model is not available.';
  }

  const response = await languageModel.prompt(`
            You are an AI assistant tasked with moderating user comments.
            Please provide a one-sentence sentiment analysis of the following comment, clearly indicating whether the tone is positive, negative, or neutral with a description.

            Response Format:
            [Sentiment] | [Description]

            Comment:
            ${comment.text}
          `);

  return response;
}

export default {
  getCommentAIReview,
};
