import { useAtomValue } from "jotai";
import { getCourse } from "../api/course";
import { atomWithQuery } from "jotai-tanstack-query";

const currentCourseAtom = atomWithQuery(() => ({
  queryKey: ["course"],
  queryFn: async () => {
    return getCourse();
  },
}));

export const useCurrentCourse = () => {
  return useAtomValue(currentCourseAtom);
};
