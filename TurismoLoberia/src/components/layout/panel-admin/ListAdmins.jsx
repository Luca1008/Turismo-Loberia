import React, { useEffect, useState } from 'react';
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import UpdateAdmin from './UpdateAdmin';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from 'react-bootstrap/Table';

const ListAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  //-------------------Listar admins------------------
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
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
  };

  //-------------------Eliminar admins---------------
  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este administrador?");
    if (!confirmar) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Error al eliminar');

      setAdmins(admins.filter(admin => admin.id !== id));
      toast.success("Administrador eliminado correctamente");
    } catch (err) {
      console.error("Error completo:", err);
      toast.error("Hubo un error: " + err.message);
    }
  };

  //-------------------Editar admins-----------------
  const handleEditClick = (admin) => {
    // Creamos un objeto con solo los datos necesarios para editar
    const adminToEdit = {
      id: admin.id,
      name: admin.name,
      surname: admin.surname,
      email: admin.email,
      password: admin
    };
    setSelectedAdmin(adminToEdit);
    setShowEditForm(true);
  };

  const handleUpdateSuccess = () => {
    setShowEditForm(false);
    fetchAdmins(); // Recargar la lista después de editar
    toast.success("Administrador actualizado correctamente");
  };

  const cancelEdit = () => {
    setShowEditForm(false);
    setSelectedAdmin(null);
  };

  if (loading) return <p>Cargando administradores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-panel-container">
      <h3>Administradores:</h3>
      
      {/* Tabla de administradores */}
      <Table striped bordered hover className="admin-table" border="1" cellPadding="8">
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
              <td colSpan="4">No se encontraron administradores.</td>
            </tr>
          ) : (
            admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.surname}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEditClick(admin)}
                    disabled={showEditForm}
                  >
                    <MdModeEdit style={{ verticalAlign: 'middle' }} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(admin.id)}
                    disabled={showEditForm}
                  >
                    <MdDeleteForever style={{ verticalAlign: 'middle' }} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Formulario de edición */}
      {showEditForm && selectedAdmin && (
        <div className="edit-form-container mt-4 p-4 border rounded">
          <h4>Editando administrador: {selectedAdmin.name} {selectedAdmin.surname}</h4>
          <UpdateAdmin 
            admin={selectedAdmin} 
            onSuccess={handleUpdateSuccess}
            onCancel={cancelEdit}
            isAdminEdit={true}
          />
        </div>
      )}
        <ToastContainer />
    </div>
  );
};

export default ListAdmins;