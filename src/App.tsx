import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { PostList } from "./components/PostList";
import { POST_LIST, START_PAGE } from "./router/posts";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path={START_PAGE} element={<HomePage />} />
          <Route path={POST_LIST} element={<PostList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
