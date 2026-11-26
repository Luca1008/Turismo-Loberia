// tests/cards.test.js
const request = require('supertest');
const express = require('express');
const cardsRoutes = require('../routes/cards.routes');
const { createToken } = require('../services/jwt');
const db = require('../models/db');
require('dotenv').config();

// Configurar app de prueba
const app = express();
app.use(express.json());
app.use('/api', cardsRoutes);

// Token de un admin ficticio (las rutas de escritura exigen sesión).
const adminToken = createToken({
  id: 0, name: 'Test', surname: 'Admin', email: 'test@example.com', role: 'admin',
});
const authHeader = { Authorization: `Bearer ${adminToken}` };

// Cards creadas por los tests, para borrarlas al final.
const createdIds = [];

afterAll(async () => {
  if (createdIds.length) {
    await db.query('DELETE FROM turismo_prueba."card" WHERE id = ANY($1::int[])', [createdIds]);
  }
});

const nuevaCard = {
  card_title: 'Test Card',
  card_description: 'Una descripción de prueba',
  card_ubicacion: 'Calle Falsa 123',
  card_horario: '8 a 17 hs',
  card_contacto: 'contacto@prueba.com',
  card_info: 'Info de prueba',
  card_city: 'Ciudad Test',
  card_category: 'Categoria Test',
};

/**
 * Test GET /api/cards-all
 * Verifica que la ruta devuelva un array de cards
 */
describe('GET /api/cards-all', () => {
  it('debería responder con un array de cards', async () => {
    const res = await request(app).get('/api/cards-all');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

/**
 * Test GET /api/cards (paginado)
 * `limit`/`page` inválidos no deben llegar al SQL.
 */
describe('GET /api/cards', () => {
  it('ignora limit/page inválidos en vez de romper la consulta', async () => {
    const res = await request(app).get('/api/cards').query({ limit: '1; DROP TABLE x', page: 'abc' });
    expect(res.statusCode).toBe(200);
    expect(res.body.cards.length).toBeLessThanOrEqual(6);
  });

  it('acota el límite a 200', async () => {
    const res = await request(app).get('/api/cards').query({ limit: 100000 });
    expect(res.statusCode).toBe(200);
    expect(res.body.cards.length).toBeLessThanOrEqual(200);
  });
});

/**
 * Test POST/PUT/DELETE /api/cards
 * Sin token deben rechazarse; con token de admin, funcionar.
 */
describe('Escritura de cards', () => {
  it('rechaza crear sin token', async () => {
    const res = await request(app).post('/api/cards').send(nuevaCard);
    expect(res.statusCode).toBe(401);
  });

  it('rechaza editar y borrar sin token', async () => {
    expect((await request(app).put('/api/cards/1').send(nuevaCard)).statusCode).toBe(401);
    expect((await request(app).delete('/api/cards/1')).statusCode).toBe(401);
  });

  it('crea, edita (con tipo) y borra una card con token de admin', async () => {
    const created = await request(app).post('/api/cards').set(authHeader)
      .send({ ...nuevaCard, card_tipo: 'hotel' });
    expect(created.statusCode).toBe(201);
    expect(created.body.card.card_title).toBe('Test Card');
    const id = created.body.card.id;
    createdIds.push(id);

    const updated = await request(app).put(`/api/cards/${id}`).set(authHeader)
      .send({ ...nuevaCard, card_title: 'Test Card editada', card_tipo: 'particular' });
    expect(updated.statusCode).toBe(200);
    expect(updated.body.card.card_title).toBe('Test Card editada');
    // card_tipo solo existe si se corrió la migración.
    if ('card_tipo' in updated.body.card) {
      expect(updated.body.card.card_tipo).toBe('particular');
    }

    // Editar sin enviar card_tipo (como el formulario del Panel) no lo borra.
    const sinTipo = await request(app).put(`/api/cards/${id}`).set(authHeader).send(nuevaCard);
    if ('card_tipo' in sinTipo.body.card) {
      expect(sinTipo.body.card.card_tipo).toBe('particular');
    }

    const deleted = await request(app).delete(`/api/cards/${id}`).set(authHeader);
    expect(deleted.statusCode).toBe(200);
  });
});
