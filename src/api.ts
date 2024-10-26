// src/api.ts

export const fetchCourses = async () => {
  const response = await fetch("/data/courses.json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const fetchCourseDetails = async (courseId: number) => {
  const response = await fetch("/data/courses.json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.find((course: { id: number }) => course.id === courseId);
};