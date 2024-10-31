import React from "react";
import { useParams } from "react-router-dom";
import { Course } from "../types";
import { fetchCourses } from "../api";
import "../components/LessonDetails.css";

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

   
      const course = courses.find(
        (c: Course) => c.id === parseInt(courseId || "0")
      );

      if (course) {
        const module = course.modules[parseInt(moduleId || "0")];

        if (module) {
          setLesson(module.lessons[parseInt(lessonId || "0")]);
        }
      }
    };

    loadLesson();
  }, [courseId, moduleId, lessonId]);

  if (!lesson) return <div>Lesson not found!</div>;

  return (
    <div className="page-center">
      <div className="lesson-container">
        <h2 className="lessonTitle">{lesson.title}</h2>
        <p className="lessonDescription">{lesson.description}</p>

        <h3 className="sectionTitle">Topics</h3>
        <ul className="topicList">
          {lesson.topics.map((topic: string, idx: number) => (
            <li className="lessonTopics" key={idx}>
              {topic}
            </li>
          ))}
        </ul>

        <h3 className="section-title">Content</h3>
        <div className="lessonContent">
          {lesson.content.map((content: any, idx: number) => {
            switch (content.type) {
              case "text":
                return <p key={idx}>{content.data}</p>;
              case "video":
                return (
                  <div className="buttonContainer">
                    <button key={idx} className="action-button link-button">
                      <a
                        href={content.data}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Video
                      </a>
                    </button>
                  </div>
                );
              case "audio":
              case "podcast":
                return (
                  <div className="buttonContainer">
                    <button key={idx} className="action-button link-button">
                      <a
                        href={content.data}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Listen
                      </a>
                    </button>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
        <div className="buttonContainer">
          <button className="action-button">
            <a href="/" className="link-button">
              Back to Course
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
