import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../api";
import SearchBar from "./SearchBar";
import { Course } from "../types";

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      const coursesData = await fetchCourses();
      setCourses(coursesData);
      setFilteredCourses(coursesData);
    };
    loadCourses();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div>
      <h1>Course Catalogue</h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {filteredCourses.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
