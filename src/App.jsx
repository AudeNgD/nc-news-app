import { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CurrentUserContext from "./contexts/CurrentUserContext";
import Homepage from "./components/Homepage";
import UserHomepage from "./components/UserHomepage";
import ArticlePage from "./components/ArticlePage";

import "./App.css";

function App() {
  const [currentUser, SetCurrentUser] = useState("jessjelly");
  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, SetCurrentUser }}>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/home/:user" element={<UserHomepage />} />
          <Route path="/home/articles/:articleId" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
