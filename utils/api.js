import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-uld9.onrender.com/api",
});

export const fetchSingleUser = (params) => {
  let endpointString = "/users";

  const username = params.username;

  endpointString += `/${username}`;

  return newsApi.get(endpointString).then(({ data }) => {
    return data;
  });
};

export const fetchArticles = (params) => {
  let endpointString = "/articles";

  if (params.hasOwnProperty("articleId")) {
    endpointString += `/${Number(params.articleId)}`;
  }

  if (params.hasOwnProperty("topic")) {
    endpointString += `?topic=${params.topic}`;
  }

  if (params.hasOwnProperty("p")) {
    const sort = params.sort_by;
    const order = params.order;
    const p = params.p;
    endpointString += `?p=${p}&sort_by=${sort}&order=${order}`;
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

export const postNewTopic = (newTopic) => {
  return newsApi.post(`/topics`, newTopic).then(({ data }) => {
    return data.new_topic;
  });
};
export const postNewArticle = (newArticle) => {
  console.log(newArticle);
  return newsApi.post(`/articles`, newArticle).then(({ data }) => {
    console.log(data.newArticle);
    return data.newArticle;
  });
};
