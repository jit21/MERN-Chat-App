import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import Chat from "./Pages/Chat";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
