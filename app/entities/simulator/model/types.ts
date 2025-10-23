import type { UserBlock } from "@/entities/block";

export type SimulatorUser = {
  completed: boolean;
  started: boolean;
  blocks: UserBlock[];
};

export type Simulator = {
  id: number;
  name: string;
  description: string;
  user?: SimulatorUser;
};
