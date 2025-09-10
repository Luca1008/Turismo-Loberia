import { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";

/**
 * Contexto de autenticación.
 * 
 * Permite compartir información del usuario autenticado y funciones relacionadas
 * con la autenticación a lo largo de la aplicación.
 * 
 * @type {React.Context<Object>}
 */
export const AuthContext = createContext();

/**
 * Componente proveedor de autenticación (`AuthProvider`).
 *
 * Envuelve a los componentes hijos y les proporciona:
 * - `auth`: Objeto con información del usuario autenticado.
 * - `setAuth`: Función para actualizar manualmente el estado de autenticación.
 * - `loading`: Booleano que indica si se está verificando el estado de autenticación.
 * - `logout`: Función para cerrar sesión y limpiar el estado de autenticación.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos que recibirán el contexto.
 *
 * @example
 * import { AuthProvider } from '../context/AuthProvider';
 *
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <YourComponents />
 *     </AuthProvider>
 *   );
 * }
 */
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  /**
   * Verifica si hay un usuario autenticado en localStorage
   * y valida su token con la API.
   */
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

      const request = await fetch(Global.url + "user/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  /**
   * Cierra la sesión del usuario eliminando el token y la información del usuario del localStorage.
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
