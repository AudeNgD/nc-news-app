import { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CurrentUserContext from "./contexts/CurrentUserContext";
import CurrentGuestContext from "./contexts/CurrentGuestContext";
import ExistingTopicsContext from "./contexts/ExistingTopicsContext";
import Homepage from "./components/Homepage";
import UserHomepage from "./components/UserHomepage";
import ArticlePage from "./components/ArticlePage";
import NavBar from "./components/NavBar";
import TopicsList from "./deprecated-components/TopicsList";
import "./App.css";
import TopicPage from "./components/TopicPage";
import { Outlet } from "react-router";
import ErrorPage from "./components/ErrorPage";
import UserAccountPage from "./components/UserAccountPage";
import NewArticle from "./components/NewArticle";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [guest, setGuest] = useState("guest");
  const [topics, setTopics] = useState([]);

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <CurrentGuestContext.Provider value={{ guest, setGuest }}>
          <ExistingTopicsContext.Provider value={{ topics, setTopics }}>
            <Routes>
              <Route path="/home" element={<Homepage />} />
              <Route path="*" element={<ErrorPage />} />
              <Route
                element={
                  <>
                    <NavBar /> <Outlet />
                  </>
                }
              >
                <Route path="/home/:user" element={<UserHomepage />} />
                <Route
                  path="/home/:user/account"
                  element={<UserAccountPage />}
                />
                <Route
                  path="/home/articles/new-article"
                  element={<NewArticle />}
                />
                <Route path="/home/topics" element={<TopicsList />} />
                <Route path="/home/topics/:topic" element={<TopicPage />} />
                <Route
                  path="/home/articles/:articleId"
                  element={<ArticlePage />}
                />
                <Route path="/" element={<Navigate to="/home" />} />
              </Route>
            </Routes>
          </ExistingTopicsContext.Provider>
        </CurrentGuestContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
