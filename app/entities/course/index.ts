export { type Course, type CourseUser } from "./model/types";

export {
  useGetCourseQuery,
  useGetCourseUserQuery,
  useSetCurrentLessonMutation,
  courseApi,
} from "./api/course.api";
