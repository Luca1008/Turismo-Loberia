import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

/**
 * Custom hook `useAuth`
 *
 * Permite acceder al contexto de autenticación (`AuthContext`) desde cualquier componente funcional.
 * Este hook devuelve el valor actual del contexto, que típicamente incluye información del usuario
 * autenticado y funciones relacionadas con la autenticación, como `login`, `logout` o `register`.
 *
 * @returns {Object} El valor del contexto de autenticación (`AuthContext`), que puede incluir:
 * - `user`: Objeto con información del usuario autenticado.
 * - `login`: Función para iniciar sesión.
 * - `logout`: Función para cerrar sesión.
 * - `register`: Función para registrar un nuevo usuario.
 * - Cualquier otro valor proporcionado por `AuthContext`.
 *
 * @example
 * import { useAuth } from '../hooks/useAuth';
 * 
 * const UserProfile = () => {
 *   const { user, logout } = useAuth();
 *
 *   return (
 *     <div>
 *       <p>Hola, {user.name}</p>
 *       <button onClick={logout}>Cerrar sesión</button>
 *     </div>
 *   );
 * };
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
