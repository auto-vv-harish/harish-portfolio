import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./App";
import SongsPage from "./SongsPage";

function Song_App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/songs" element={<SongsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Song_App;