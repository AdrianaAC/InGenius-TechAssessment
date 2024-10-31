// src/components/CourseDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Course } from "../types";
import { fetchCourses } from "../api";


const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = React.useState<Course | null>(null);

  React.useEffect(() => {
    const loadCourse = async () => {
      const courses = await fetchCourses();
      const selectedCourse = courses.find(
        (c: Course) => c.id === parseInt(courseId || "0")
      );
      setCourse(selectedCourse || null);
    };
    loadCourse();
  }, [courseId]);

  if (!course) return <div>Course not found!</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <h3>Modules</h3>
      <ul>
        {course.modules.map((module, idx) => (
          <li key={idx}>
            <h4>{module.title}</h4>
            <ul>
              {module.lessons.map((lesson, index) => (
                <li key={index}>
                  <Link
                    to={`/courses/${course.id}/modules/${idx}/lessons/${index}`}
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <Link to="/">Back to Course List</Link>
    </div>
  );
};

export default CourseDetail;
