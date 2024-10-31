import { Course } from "./types";

/**
 * Fetches the list of courses from the data/courses.json file.
 * @returns {Promise<Course[]>} A promise that resolves to an array of courses.
 * @throws Will throw an error if the network response is not ok.
 */
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await fetch("/data/courses.json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

/**
 * Fetches the details of a specific course by its ID.
 * @param {number} courseId - The ID of the course to fetch details for.
 * @returns {Promise<Course | undefined>} A promise that resolves to the course details, or undefined if not found.
 * @throws Will throw an error if the network response is not ok.
 */
export const fetchCourseDetails = async (
  courseId: number
): Promise<Course | undefined> => {
  const response = await fetch("/data/courses.json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.find((course: { id: number }) => course.id === courseId);
};
