import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [curenntUser, setCurenntUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const res = await axios.post(
      `${proccess.env.REACT_APP_SERVER_URL}/`,
      inputs
    );
    setCurenntUser(res.data);
    localStorage.setItem("auth", true);
  };

  const logout = async () => {
    await axios.post(`${proccess.env.REACT_APP_SERVER_URL}/main`);
    setCurenntUser(null);
    localStorage.setItem("auth", false);
  };

  useEffect(() => {
    const patchUser = async () => {
      const lastlogineddate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      await axios.patch(`${proccess.env.REACT_APP_SERVER_URL}/`, {
        id: curenntUser?.id,
        lastlogineddate,
      });
    };

    patchUser();

    localStorage.setItem("user", JSON.stringify(curenntUser));
  }, [curenntUser]);

  return (
    <AuthContext.Provider
      value={{
        curenntUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
