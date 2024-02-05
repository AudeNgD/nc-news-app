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
