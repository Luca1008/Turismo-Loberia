/**
 * Middleware: deja pasar solo si el usuario de la sesión es el mismo del
 * parámetro `:id` de la ruta, o si es superadmin. Debe ir después de `auth`
 * (usa `req.user`).
 *
 * Evita que un admin vea, modifique o borre la cuenta de otro usuario.
 */
const requireSelfOrSuperAdmin = (req, res, next) => {
  const isSelf = String(req.user?.id) === String(req.params.id);
  if (!isSelf && req.user?.role !== "superadmin") {
    return res.status(403).send({
      status: "error",
      message: "No tenés permiso para acceder a este usuario",
    });
  }
  next();
};

module.exports = requireSelfOrSuperAdmin;
