import { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CurrentUserContext from "./contexts/CurrentUserContext";
import CurrentGuestContext from "./contexts/CurrentGuestContext";
import Homepage from "./components/Homepage";
import UserHomepage from "./components/UserHomepage";
import ArticlePage from "./components/ArticlePage";
import NavBar from "./components/NavBar";
import TopicsList from "./deprecated-components/TopicsList";
import "./App.css";
import TopicPage from "./components/TopicPage";
import { Outlet } from "react-router";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [guest, setGuest] = useState("guest");

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <CurrentGuestContext.Provider value={{ guest, setGuest }}>
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
              <Route path="/home/topics" element={<TopicsList />} />
              <Route path="/home/topics/:topic" element={<TopicPage />} />
              <Route
                path="/home/articles/:articleId"
                element={<ArticlePage />}
              />
              <Route path="/" element={<Navigate to="/home" />} />
            </Route>
          </Routes>
        </CurrentGuestContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
