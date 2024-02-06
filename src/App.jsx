import { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CurrentUserContext from "./contexts/CurrentUserContext";
import Homepage from "./components/Homepage";
import UserHomepage from "./components/UserHomepage";
import ArticlePage from "./components/ArticlePage";
import NavBar from "./components/NavBar";
import TopicsList from "./components/TopicsList";
import "./App.css";
import TopicPage from "./components/TopicPage";

function App() {
  const [currentUser, setCurrentUser] = useState("jessjelly");
  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/home/:user" element={<UserHomepage />} />
          <Route path="/home/topics" element={<TopicsList />} />
          <Route path="/home/topics/:topic" element={<TopicPage />} />
          <Route path="/home/articles/:articleId" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
