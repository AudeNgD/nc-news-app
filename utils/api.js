import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-uld9.onrender.com/api",
});

export const fetchArticles = (params) => {
  let endpointString = "/articles";

  if (params.hasOwnProperty("articleId")) {
    endpointString += `/${Number(params.articleId)}`;
  }

  if (params.hasOwnProperty("topic")) {
    endpointString += `?topic=${params.topic}`;
  }

  if (params.hasOwnProperty("sort") || params.hasOwnProperty("order")) {
    const sort = params.sort_by;
    const order = params.order;
    if (sort !== "" && order === "") endpointString += `?sort_by=${sort}`;
    if (sort === "" && order !== "") endpointString += `?order=${order}`;
    if (sort !== "" && order !== "")
      endpointString += `?sort_by=${sort}&order=${order}`;
  }

  return newsApi.get(endpointString).then(({ data }) => {
    return data;
  });
};

export const fetchComments = (params) => {
  const article_id = params.articleId;
  return newsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
  // .catch((err) => {
  //   console.log(err);
  // });
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

export const deleteComment = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};

export const fetchTopics = () => {
  return newsApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};
