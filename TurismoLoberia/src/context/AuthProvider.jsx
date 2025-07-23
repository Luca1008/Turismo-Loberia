import { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      setLoading(false);
      return;
    }

    try {
      const userObj = JSON.parse(user);
      const userId = userObj.id;

      if (!userId) {
        console.warn("El usuario no tiene ID válido.");
        setLoading(false);
        return;
      }

      const request = await fetch(Global.url + "user/profile/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ← siempre con Bearer
        },
      });

      const response = await request.json();

      if (response.status === "success") {
        setAuth(response.user);
      } else {
        console.warn("No se pudo autenticar al usuario.");
        setAuth({});
      }
    } catch (err) {
      console.error("Error al autenticar:", err);
      setAuth({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
