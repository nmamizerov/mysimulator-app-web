import { useMatches } from "react-router";
import type { Course } from "@/entities/course";

/**
 * Хук для получения данных курса из root loader'а
 * @returns Данные курса или undefined
 */
export const useCourse = (): Course | undefined => {
  const matches = useMatches();
  const rootMatch = matches.find((match) => match.id === "root");
  return (rootMatch?.loaderData as { course?: Course })?.course;
};
