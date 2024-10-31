// src/components/CourseList.tsx
import React, { useEffect, useState } from "react";
import { fetchCourses, fetchCourseDetails } from "../api";
import SearchBar from "./SearchBar";
import { Course, CourseDetails } from "../types";
import "./CourseList.css";
import { Link } from "react-router-dom";

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<{
    [key: number]: CourseDetails;
  }>({});

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await fetchCourses();
        console.log("Fetched courses:", coursesData);
        setCourses(coursesData);
        setFilteredCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
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

  const handleCardClick = async (id: number) => {
    const card = document.getElementById(`course-card-${id}`);
    if (card) {
      card.classList.toggle("flipped");
      if (!courseDetails[id]) {
        try {
          const details = await fetchCourseDetails(id);
          console.log("Fetched course details for course ID", id, ":", details);
          setCourseDetails((prevDetails) => ({
            ...prevDetails,
            [id]: details,
          }));
        } catch (error) {
          console.error(
            "Error fetching course details for course ID",
            id,
            ":",
            error
          );
        }
      }
    }
  };

  return (
    <div className="course-catalogue">
      <h1>Course Catalogue</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="course-grid">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            id={`course-card-${course.id}`}
            className="course-card"
            onClick={() => handleCardClick(course.id)}
          >
            <div className="course-card-inner">
              <div className="course-card-front">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="course-image"
                />
                <h2>{course.title}</h2>
                <p>{course.description}</p>
              </div>
              <div className="course-card-back">
                {courseDetails[course.id] ? (
                  <div className="content">
                    <h3 className="moduleTitle">Modules</h3>
                    {courseDetails[course.id].modules.map((module, idx) => (
                      <div className="cardBackContent">
                        <h4 className="lessonsTitle">{module.title}</h4>
                        <ul className="lessonsItems">
                          <li key={idx}>
                            <ul>
                              {module.lessons.map((lesson, index) => (
                                <li className="lessonsItemLink" key={index}>
                                  <Link
                                  className="lessonsLink"
                                    to={`/courses/${course.id}/modules/${idx}/lessons/${index}`}
                                  >
                                    {lesson.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        </ul>
                      </div>
                    ))}

                  </div>
                ) : (
                  <p>Loading details...</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
