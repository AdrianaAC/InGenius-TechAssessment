import React from "react";
import { useParams } from "react-router-dom";
import { Course } from "../types";
import { fetchCourses } from "../api";

const LessonDetail: React.FC = () => {
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>();
  const [lesson, setLesson] = React.useState<any>(null);

  React.useEffect(() => {
    const loadLesson = async () => {
      const courses = await fetchCourses();
      
      // Safely handle undefined courseId, moduleId, and lessonId
      const course = courses.find((c) => c.id === parseInt(courseId || '0'));
      
      if (course) {
        const module = course.modules[parseInt(moduleId || '0')];
        
        if (module) {
          setLesson(module.lessons[parseInt(lessonId || '0')]);
        }
      }
    };
  
    loadLesson();
  }, [courseId, moduleId, lessonId]);

  if (!lesson) return <div>Lesson not found!</div>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <h3>Topics</h3>
      <ul>
        {lesson.topics.map((topic: string, idx: number) => (
          <li key={idx}>{topic}</li>
        ))}
      </ul>

      <h3>Content</h3>
      {lesson.content.map((content: any, idx: number) => {
        switch (content.type) {
          case "text":
            return <p key={idx}>{content.data}</p>;
          case "video":
            return (
              <div key={idx}>
                <a
                  href={content.data}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Video
                </a>
              </div>
            );
          case "audio":
          case "podcast":
            return (
              <div key={idx}>
                <a
                  href={content.data}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Listen
                </a>
              </div>
            );
          default:
            return null;
        }
      })}

      <br />
      <a href={`/courses/${courseId}`}>Back to Course</a>
    </div>
  );
};

export default LessonDetail;
