import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import {
  LuHotel,
  LuHouse,
  LuTrees,
  LuBuilding2,
  LuBedDouble,
  LuTent,
  LuMapPin,
  LuPhone,
  LuMail,
  LuGlobe,
  LuInfo,
  LuPencil,
  LuTrash2,
  LuPlus,
  LuShieldCheck,
} from "react-icons/lu";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import useAccommodations from "../../hooks/useAccommodations";
import { ACCOMMODATION_GROUPS, ACCOMMODATION_UPDATED } from "../../helpers/alojamientos";
import { parseContactLine, splitContacts } from "../../helpers/contactLinks";
import "../../styles/accommodationDirectory.css";

const GROUP_ICONS = {
  hotel: LuHotel,
  house: LuHouse,
  trees: LuTrees,
  building: LuBuilding2,
  bed: LuBedDouble,
  tent: LuTent,
};

const CONTACT_ICONS = {
  phone: LuPhone,
  email: LuMail,
  web: LuGlobe,
  instagram: FaInstagram,
  facebook: FaFacebook,
  text: LuInfo,
};

/** Búsqueda de la dirección en Google Maps (en mobile abre la app). Se
 * agrega la localidad porque las direcciones vienen sin ella. */
const mapsHref = (direccion, city) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${direccion}, ${city}, Buenos Aires, Argentina`
  )}`;

const EMPTY_FORM = {
  card_tipo: "",
  card_title: "",
  card_description: "",
  card_ubicacion: "",
  card_contacto: "",
  card_info: "",
};

/** Una tarjeta de alojamiento (con botones de admin si corresponde). */
const AccommodationCard = ({ item, city, canEdit, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const contacts = splitContacts(item.card_contacto).map(parseContactLine);

  return (
    <li className="lodging-card">
      <div className="lodging-card-head">
        <h5 className="lodging-name">{item.card_title}</h5>
        {canEdit && (
          <div className="lodging-admin-actions">
            <button
              type="button"
              className="lodging-icon-btn"
              onClick={() => onEdit(item)}
              aria-label={`${t("alojamientos_listado.admin.editar")} ${item.card_title}`}
              title={t("alojamientos_listado.admin.editar")}
            >
              <LuPencil aria-hidden="true" />
            </button>
            <button
              type="button"
              className="lodging-icon-btn lodging-icon-btn-danger"
              onClick={() => onDelete(item)}
              aria-label={`${t("alojamientos_listado.admin.borrar")} ${item.card_title}`}
              title={t("alojamientos_listado.admin.borrar")}
            >
              <LuTrash2 aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {item.card_description && <p className="lodging-detail">{item.card_description}</p>}

      {item.card_ubicacion && (
        <a
          className="lodging-line lodging-address"
          href={mapsHref(item.card_ubicacion, city)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("alojamientos_listado.ver_mapa")}: ${item.card_ubicacion}`}
        >
          <LuMapPin aria-hidden="true" />
          <span>{item.card_ubicacion}</span>
        </a>
      )}

      {contacts.length > 0 && (
        <ul className="lodging-contacts">
          {contacts.map((c) => {
            const Icon = CONTACT_ICONS[c.type];
            const content = (
              <>
                <Icon aria-hidden="true" />
                <span>{c.label}</span>
              </>
            );
            return (
              <li key={c.label}>
                {c.href ? (
                  <a
                    className={`lodging-line lodging-contact lodging-contact-${c.type}`}
                    href={c.href}
                    {...(c.type === "phone" || c.type === "email"
                      ? {
                          "aria-label": `${
                            c.type === "phone"
                              ? t("alojamientos_listado.llamar")
                              : t("alojamientos_listado.abrir")
                          } ${item.card_title}: ${c.label}`,
                        }
                      : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {content}
                  </a>
                ) : (
                  <span className={`lodging-line lodging-contact lodging-contact-${c.type}`}>{content}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {item.card_info && <span className="lodging-note">{item.card_info}</span>}
    </li>
  );
};

/**
 * Componente `AccommodationDirectory`
 *
 * Listado de alojamientos de una ciudad, agrupado según
 * ACCOMMODATION_GROUPS (hoteles/particulares en Lobería; cabañas, apart,
 * hostal y campings en Arenas Verdes). Dirección → Google Maps, teléfonos
 * → llamada, @usuario → Instagram, email y web clickeables.
 *
 * Si quien mira es administrador (sesión iniciada), muestra botones para
 * agregar (uno por grupo, que fija el tipo), editar y borrar. Los cambios se
 * guardan como cards de categoría "Alojamiento" (también aparecen en el
 * Buscador).
 *
 * @component
 * @param {"loberia"|"arenas_verdes"} cityKey
 */
const AccommodationDirectory = ({ cityKey }) => {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const isAdmin = Boolean(auth?.id);
  const { items, source, loading, city, save, remove } = useAccommodations(cityKey);
  const groups = ACCOMMODATION_GROUPS[cityKey];
  const canEdit = isAdmin && source === "api";

  const [editing, setEditing] = useState(null); // { original?, form }
  const [deleting, setDeleting] = useState(null); // item
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState("");

  const errorMessage = (err, fallbackKey) =>
    err?.status === 401
      ? t("alojamientos_listado.admin.error_sesion")
      : t(`alojamientos_listado.admin.${fallbackKey}`);

  const openNew = (tipo) => {
    setFormError("");
    setEditing({ original: null, form: { ...EMPTY_FORM, card_tipo: tipo } });
  };

  const openEdit = (item) => {
    setFormError("");
    setEditing({
      original: item,
      form: Object.fromEntries(Object.keys(EMPTY_FORM).map((k) => [k, item[k] ?? ""])),
    });
  };

  const updateField = (e) =>
    setEditing((prev) => ({ ...prev, form: { ...prev.form, [e.target.name]: e.target.value } }));

  const handleSave = async (e) => {
    e.preventDefault();
    const form = Object.fromEntries(
      Object.entries(editing.form).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
    );
    setBusy(true);
    setFormError("");
    try {
      await save(form, editing.original);
      setEditing(null);
      setStatus(t("alojamientos_listado.admin.guardado"));
    } catch (err) {
      setFormError(errorMessage(err, "error_guardar"));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await remove(deleting.id);
      setDeleting(null);
      setStatus(t("alojamientos_listado.admin.borrado"));
    } catch (err) {
      setDeleting(null);
      setStatus(errorMessage(err, "error_borrar"));
    } finally {
      setBusy(false);
    }
  };

  const updated = source === "fallback" ? ACCOMMODATION_UPDATED[cityKey] : null;

  return (
    <div className="lodging-directory">
      {isAdmin && (
        <div className="lodging-admin-bar" role="note">
          <LuShieldCheck aria-hidden="true" />
          <span>
            {t("alojamientos_listado.admin.barra")}
            {source === "fallback" && (
              <>
                {". "}
                <strong>{t("alojamientos_listado.admin.respaldo")}</strong>
              </>
            )}
          </span>
        </div>
      )}

      <h3 className="lodging-directory-title">
        {t("alojamientos_listado.titulo", { lugar: city })}
      </h3>

      {/* Mensajes de guardado/borrado para lectores de pantalla y a la vista. */}
      <p className="lodging-status" role="status" aria-live="polite">
        {status}
      </p>

      {loading ? (
        <p className="lodging-loading">{t("alojamientos_listado.cargando")}</p>
      ) : (
        groups.map(({ tipo, icon, label }) => {
          const Icon = GROUP_ICONS[icon];
          const groupItems = items.filter((i) => i.card_tipo === tipo);
          if (groupItems.length === 0 && !canEdit) return null;
          return (
            <div key={tipo} className="lodging-group">
              <header className="lodging-group-header">
                <span className="lodging-group-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h4 className="lodging-group-title">{t(label)}</h4>
                <span className="accent-chip accent-blue">{groupItems.length}</span>
                {canEdit && (
                  <button
                    type="button"
                    className="accent-pill-button accent-blue lodging-add-btn"
                    onClick={() => openNew(tipo)}
                  >
                    <LuPlus aria-hidden="true" />
                    {t("alojamientos_listado.admin.agregar")}
                    <span className="visually-hidden"> — {t(label)}</span>
                  </button>
                )}
              </header>

              {groupItems.length === 0 ? (
                <p className="lodging-empty">{t("alojamientos_listado.vacio")}</p>
              ) : (
                <ul className="lodging-list">
                  {groupItems.map((item) => (
                    <AccommodationCard
                      key={item.id ?? item.card_title}
                      item={item}
                      city={city}
                      canEdit={canEdit}
                      onEdit={openEdit}
                      onDelete={setDeleting}
                    />
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}

      <p className="lodging-updated">
        <LuInfo aria-hidden="true" />
        <span>
          {updated
            ? t("alojamientos_listado.actualizado", { fecha: updated })
            : t("alojamientos_listado.consultar")}
        </span>
      </p>

      {/* ---------- Formulario agregar / editar ---------- */}
      <Modal
        show={Boolean(editing)}
        onHide={() => !busy && setEditing(null)}
        centered
        fullscreen="sm-down"
        className="lodging-modal"
      >
        {editing && (
          <form onSubmit={handleSave}>
            <Modal.Header closeButton>
              <Modal.Title as="h2" className="lodging-modal-title">
                {editing.original
                  ? t("alojamientos_listado.admin.titulo_editar")
                  : t("alojamientos_listado.admin.titulo_nuevo")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="lodging-form">
              <label>
                <span>{t("alojamientos_listado.admin.tipo")}</span>
                <select name="card_tipo" value={editing.form.card_tipo} onChange={updateField} required>
                  {groups.map((g) => (
                    <option key={g.tipo} value={g.tipo}>
                      {t(g.label)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>
                  {t("alojamientos_listado.admin.nombre")}{" "}
                  <small>({t("alojamientos_listado.admin.obligatorio")})</small>
                </span>
                <input name="card_title" value={editing.form.card_title} onChange={updateField} required maxLength={100} autoFocus />
              </label>
              <label>
                <span>{t("alojamientos_listado.admin.descripcion")}</span>
                <textarea name="card_description" value={editing.form.card_description} onChange={updateField} rows={3} />
              </label>
              <label>
                <span>{t("alojamientos_listado.admin.direccion")}</span>
                <input name="card_ubicacion" value={editing.form.card_ubicacion} onChange={updateField} maxLength={255} />
              </label>
              <label>
                <span>
                  {t("alojamientos_listado.admin.contactos")}{" "}
                  <small>({t("alojamientos_listado.admin.obligatorio")})</small>
                </span>
                <textarea
                  name="card_contacto"
                  value={editing.form.card_contacto}
                  onChange={updateField}
                  rows={3}
                  required
                  aria-describedby="lodging-contactos-ayuda"
                />
                <small id="lodging-contactos-ayuda">{t("alojamientos_listado.admin.contactos_ayuda")}</small>
              </label>
              <label>
                <span>{t("alojamientos_listado.admin.nota")}</span>
                <input name="card_info" value={editing.form.card_info} onChange={updateField} aria-describedby="lodging-nota-ayuda" />
                <small id="lodging-nota-ayuda">{t("alojamientos_listado.admin.nota_ayuda")}</small>
              </label>
              {formError && (
                <p className="lodging-form-error" role="alert">
                  {formError}
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="lodging-btn-secondary" onClick={() => setEditing(null)} disabled={busy}>
                {t("alojamientos_listado.admin.cancelar")}
              </button>
              <button type="submit" className="accent-pill-button accent-blue" disabled={busy}>
                {busy ? t("alojamientos_listado.admin.guardando") : t("alojamientos_listado.admin.guardar")}
              </button>
            </Modal.Footer>
          </form>
        )}
      </Modal>

      {/* ---------- Confirmación de borrado ---------- */}
      <Modal show={Boolean(deleting)} onHide={() => !busy && setDeleting(null)} centered className="lodging-modal">
        {deleting && (
          <>
            <Modal.Header closeButton>
              <Modal.Title as="h2" className="lodging-modal-title">
                {t("alojamientos_listado.admin.confirmar_titulo")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="mb-0">
                {t("alojamientos_listado.admin.confirmar_texto", { nombre: deleting.card_title })}
              </p>
            </Modal.Body>
            <Modal.Footer>
              {/* El foco arranca en "Cancelar" para que Enter no borre por error. */}
              <button type="button" className="lodging-btn-secondary" onClick={() => setDeleting(null)} disabled={busy} autoFocus>
                {t("alojamientos_listado.admin.cancelar")}
              </button>
              <button type="button" className="lodging-btn-danger" onClick={handleDelete} disabled={busy}>
                {t("alojamientos_listado.admin.confirmar_si")}
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AccommodationDirectory;
