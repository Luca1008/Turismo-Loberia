import React, { useEffect, useState } from 'react';
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

const ListAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/user/admins')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar admins');
        return res.json();
      })
      .then(data => {
        setAdmins(data.admins || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando administradores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Administradores:</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 ? (
            <tr>
              <td colSpan="3">No se encontraron administradores.</td>
            </tr>
          ) : (
            admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.surname}</td>
                <td>
                <button
                    style={{ marginRight: '8px' }}
                    onClick={() => onEdit && onEdit(admin.id)}
                  >
                    <MdModeEdit style={{ verticalAlign: 'middle' }} />
                  </button>
                  <button
                    style={{ color: 'red' }}
                    onClick={() => onDelete && onDelete(admin.id)}
                  >
                    <MdDeleteForever style={{ verticalAlign: 'middle' }} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListAdmins;
