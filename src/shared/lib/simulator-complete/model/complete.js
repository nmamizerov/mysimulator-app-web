import { createContext, useContext } from "react";

export const CompleteContext = createContext({
  isMobile: false,
  onComplete: () => {},
});

export const useCompleteContext = () => {
  return useContext(CompleteContext);
};
