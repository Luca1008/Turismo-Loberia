const path = require("path");
const fs = require("fs");

const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "sectionContent.json");

const readOverrides = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (_) {
    return {};
  }
};

const writeOverrides = (data) => {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const sectionImageDir = (city, section) =>
  path.join(__dirname, "..", "public", "sections", city, section);

const findSectionImageFile = (city, section) => {
  const dir = sectionImageDir(city, section);
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  return files.length > 0 ? files[0] : null;
};

/**
 * GET /sections/:city/:section
 *
 * Devuelve el override de texto/imagen de una sección, si existe.
 *
 * @group Sections - Contenido editable de las secciones de ciudad
 * @param {string} city.path.required - Id de la ciudad (ver CITY_SECTIONS)
 * @param {string} section.path.required - Id de la sección
 * @returns {Object} 200 - { text: string|null, imageUrl: string|null }
 */
exports.getSection = (req, res) => {
  const { city, section } = req.params;
  const overrides = readOverrides();
  const text = overrides[city]?.[section]?.text ?? null;
  const imageFile = findSectionImageFile(city, section);
  const imageUrl = imageFile
    ? `/api/public/sections/${city}/${section}/${imageFile}`
    : null;
  res.json({ text, imageUrl });
};

/**
 * POST /sections/:city/:section
 *
 * Crea/actualiza el override de texto y/o imagen de una sección.
 *
 * @group Sections - Contenido editable de las secciones de ciudad
 * @param {string} city.path.required - Id de la ciudad
 * @param {string} section.path.required - Id de la sección
 * @param {string} text.body - Texto override en español (string vacío = restablecer)
 * @param {string} resetText.body - "true" para restablecer el texto al default
 * @param {string} resetImage.body - "true" para restablecer la imagen al default
 * @param {file} image.formData - Nueva imagen para la sección
 * @returns {Object} 200 - { text: string|null, imageUrl: string|null }
 */
exports.upsertSection = (req, res) => {
  const { city, section } = req.params;
  const { text, resetText, resetImage } = req.body;

  const overrides = readOverrides();
  overrides[city] = overrides[city] || {};
  const current = { ...(overrides[city][section] || {}) };

  if (resetText === "true" || text === "") {
    delete current.text;
  } else if (typeof text === "string") {
    current.text = text;
  }

  if (resetImage === "true") {
    const dir = sectionImageDir(city, section);
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach((filename) => {
        try {
          fs.unlinkSync(path.join(dir, filename));
        } catch (_) {}
      });
    }
  } else if (req.file) {
    // Elimina cualquier archivo previo de la sección, deja solo el recién subido
    const dir = sectionImageDir(city, section);
    fs.readdirSync(dir).forEach((filename) => {
      if (filename !== req.file.filename) {
        try {
          fs.unlinkSync(path.join(dir, filename));
        } catch (_) {}
      }
    });
  }

  if (Object.keys(current).length === 0) {
    delete overrides[city][section];
  } else {
    overrides[city][section] = current;
  }
  if (Object.keys(overrides[city]).length === 0) {
    delete overrides[city];
  }

  writeOverrides(overrides);

  const imageFile = findSectionImageFile(city, section);
  const imageUrl = imageFile
    ? `/api/public/sections/${city}/${section}/${imageFile}?t=${Date.now()}`
    : null;
  res.json({ text: current.text ?? null, imageUrl });
};
