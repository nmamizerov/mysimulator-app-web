import { atom, useAtom } from "jotai";

const authAtom = atom({
  isAuth: !!localStorage.getItem("externalAuthData"),
});

export const useAuth = () => {
  const [authData, setAuthData] = useAtom(authAtom);

  const setAuthToken = (token) => {
    setAuthData({ access: token, isAuth: true });
    localStorage.setItem("externalAuthData", JSON.stringify({ access: token }));
  };

  return {
    isAuth: authData.isAuth,
    setAuthToken,
  };
};
