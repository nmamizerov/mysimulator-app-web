import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";
import { getSimulator, resetSimulator, startSimulator } from "../api/simulator";
import { useHydrateAtoms } from "jotai/utils";
import { useEffect } from "react";

const currentCompleteSimulatorId = atom();
const completeSimulatorAtom = atomWithQuery((get) => ({
  queryKey: ["simulators", get(currentCompleteSimulatorId)],
  queryFn: async ({ queryKey: [, id] }) => {
    return getSimulator(id);
  },
}));

const resetSimulatorCompletionAtom = atomWithMutation(() => ({
  mutationKey: ["resetSimulatorCompletion"],
  mutationFn: async (id) => {
    return resetSimulator(id);
  },
}));

const startSimulatorCompletionAtom = atomWithMutation(() => ({
  mutationKey: ["startSimulatorCompletion"],
  mutationFn: async (id) => {
    return startSimulator(id);
  },
}));

export const useCurrentSimulator = (id) => {
  const [, setCurrentSimulatorId] = useAtom(currentCompleteSimulatorId);
  useHydrateAtoms([[currentCompleteSimulatorId, id]]);

  useEffect(() => {
    setCurrentSimulatorId(id);
  }, [id]);
  return useAtomValue(completeSimulatorAtom);
};

export const useResetSimulatorCompletion = () => {
  return useAtomValue(resetSimulatorCompletionAtom);
};

export const useStartSimulator = () => {
  return useAtomValue(startSimulatorCompletionAtom);
};
