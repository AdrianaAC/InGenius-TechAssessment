import { Course } from "./types";
import coursesData from "./data/courses.json";

export const fetchCourses = async (): Promise<Course[]> => {
  return coursesData as Course[]; // Use the "as" keyword to cast to Course[]
};
