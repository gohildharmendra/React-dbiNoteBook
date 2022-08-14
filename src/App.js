import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home key="Home" />} />
          <Route exact path="/about" element={<About key="About" />} />
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
