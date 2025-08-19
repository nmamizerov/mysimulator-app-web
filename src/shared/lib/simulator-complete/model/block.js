import { atomWithMutation } from "jotai-tanstack-query";
import { completeBlock } from "../api/block";
import { useAtomValue } from "jotai";

const completeBlockAtom = atomWithMutation(() => ({
  mutationKey: ["completeBlock"],
  mutationFn: async (data) => {
    return completeBlock(data);
  },
}));

export const useCompleteBlock = () => {
  return useAtomValue(completeBlockAtom);
};
