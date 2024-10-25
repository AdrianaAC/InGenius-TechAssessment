import React from "react";
import "./App.css";
import { Course } from "./types";
import coursesData from "./data/courses.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetails";
import LessonDetail from "./components/LessonDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route
          path="/courses/:courseId/modules/:moduleId/lessons/:lessonId"
          element={<LessonDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
