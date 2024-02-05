import axios from "axios";

export const fetchArticles = (article_id) => {
  let endpointString = "https://nc-news-uld9.onrender.com/api/articles";

  if (article_id !== undefined) {
    endpointString += `/${article_id}`;
  }
  console.log(endpointString);
  return axios
    .get(endpointString)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
