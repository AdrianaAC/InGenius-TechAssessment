// src/components/CourseCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className="course-card">
      <img src={imageUrl} alt={title} className="course-image" />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={`/courses/${id}`} className="view-course-link">
        View Course
      </Link>
    </div>
  );
};

export default CourseCard;
