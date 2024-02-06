import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-uld9.onrender.com/api",
});

export const fetchArticles = (article_id) => {
  let endpointString = "/articles";

  if (article_id !== undefined) {
    endpointString += `/${article_id}`;
  }

  return newsApi
    .get(endpointString)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchComments = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const patchArticleVotes = (vote, article_id) => {
  const votePatch = { inc_votes: vote };
  return newsApi
    .patch(`/articles/${article_id}`, votePatch)
    .then(({ data }) => {
      return data.updatedArticle;
    });
};

export const postNewComment = (newComment, article_id) => {
  return newsApi
    .post(`/articles/${article_id}/comments`, newComment)
    .then(({ data }) => {
      return data.comment;
    });
};
