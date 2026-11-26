/**
 * Middleware de autorización por rol.
 *
 * Debe usarse siempre después de `auth` (que puebla `req.user` desde el JWT).
 * Corta la request con 403 si el usuario autenticado no es superadmin.
 *
 * @example
 * router.post("/sections/:city/:section", auth, requireSuperAdmin, controller.upsertSection);
 */
const requireSuperAdmin = (req, res, next) => {
  if (req.user?.role !== "superadmin") {
    return res.status(403).send({
      status: "error",
      message: "Acción reservada a superadmin",
    });
  }
  next();
};

module.exports = requireSuperAdmin;
