import { atomWithQuery } from "jotai-tanstack-query";
import { getLessons } from "../api/lesson";
import { atom, useAtom, useAtomValue } from "jotai";

const lessonsAtom = atomWithQuery(() => ({
  queryKey: ["lessons"],
  queryFn: getLessons,
}));

const currentLessonAtom = atom();
export const useLessons = () => {
  return useAtomValue(lessonsAtom);
};

export const useCurrentLesson = () => {
  return useAtom(currentLessonAtom);
};
