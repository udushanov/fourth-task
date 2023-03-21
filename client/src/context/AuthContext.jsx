import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [curenntUser, setCurenntUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/", inputs);
    setCurenntUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:8800/logout", inputs);

    setCurenntUser(null);
  };

  useEffect(() => {
    const patchUser = async () => {
      const lastlogineddate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      await axios.patch("http://localhost:8800/", {
        id: curenntUser.id,
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
