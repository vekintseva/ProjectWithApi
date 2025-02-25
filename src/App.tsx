import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { PostList } from "./components/PostList";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
