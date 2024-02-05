import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CurrentUserContext from "./contexts/CurrentUserContext";
import Homepage from "./components/Homepage";

import "./App.css";

function App() {
  const [currentUser, SetCurrentUser] = useState("");
  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, SetCurrentUser }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
