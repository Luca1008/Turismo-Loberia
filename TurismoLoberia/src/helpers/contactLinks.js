/**
 * Convierte una línea de contacto (tal como se carga en `card_contacto`,
 * una por línea) en un enlace clickeable cuando se puede:
 *  - email            → mailto:
 *  - web (www./http)  → https://
 *  - @usuario         → Instagram ("Instagram: nombre" → solo el ícono si
 *                       no es un usuario válido)
 *  - Facebook         → enlace si trae facebook.com/..., si no solo el ícono
 *  - teléfono         → tel: (se toma el primer número de la línea, así
 *                       "Lobería: 02261-442126 int. 100" llama al 02261442126)
 *  - cualquier otro texto (ej. un horario) se muestra tal cual.
 *
 * @param {string} line
 * @returns {{ type: "email"|"facebook"|"web"|"instagram"|"phone"|"text", label: string, href?: string }}
 */
export const parseContactLine = (line) => {
  const label = line.trim();

  const email = label.match(/[^\s@|]+@[^\s@|]+\.[a-z]{2,}/i);
  if (email) return { type: "email", label, href: `mailto:${email[0]}` };

  // Facebook: con dirección de la página (facebook.com/...) es un enlace;
  // si solo dice "Facebook: Nombre de la página" se muestra con el ícono
  // pero sin enlace (el nombre visible no siempre coincide con la URL).
  const fbUrl = label.match(/(https?:\/\/)?(www\.|m\.)?(facebook|fb)\.com\/\S+/i);
  if (fbUrl) {
    const url = fbUrl[0].startsWith("http") ? fbUrl[0] : `https://${fbUrl[0]}`;
    return { type: "facebook", label, href: url };
  }
  if (/^facebook\s*:/i.test(label)) return { type: "facebook", label };

  // "Instagram: usuario": enlace solo si es un usuario válido (sin espacios);
  // si es un nombre (ej. "Instagram: Frente al mar-departamentos") va con el
  // ícono pero sin enlace.
  const igLabeled = label.match(/^instagram\s*:\s*@?(.+)$/i);
  if (igLabeled) {
    const handle = igLabeled[1].trim();
    return /^[A-Za-z0-9._]+$/.test(handle)
      ? { type: "instagram", label, href: `https://www.instagram.com/${handle}/` }
      : { type: "instagram", label };
  }

  const web = label.match(/(https?:\/\/\S+|www\.\S+)/i);
  if (web) {
    const url = web[0].startsWith("http") ? web[0] : `https://${web[0]}`;
    return { type: "web", label, href: url };
  }

  const ig = label.match(/^@([A-Za-z0-9._]+)$/);
  if (ig) return { type: "instagram", label, href: `https://www.instagram.com/${ig[1]}/` };

  const phone = label.match(/\+?\d[\d\s-]{6,}\d/);
  if (phone) {
    const raw = phone[0];
    const digits = raw.replace(/\D/g, "");
    return { type: "phone", label, href: `tel:${raw.startsWith("+") ? "+" : ""}${digits}` };
  }

  return { type: "text", label };
};

/** Separa `card_contacto` en líneas no vacías. */
export const splitContacts = (contacto) =>
  (contacto || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
