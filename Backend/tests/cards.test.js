// tests/cards.test.js
const request = require('supertest');
const express = require('express');
const cardsRoutes = require('../routes/cards.routes');
require('dotenv').config();

// Configurar app de prueba
const app = express();
app.use(express.json());
app.use('/api', cardsRoutes);

// Test GET /api/cards-all
describe('GET /api/cards-all', () => {
  it('debería responder con un array de cards', async () => {
    const res = await request(app).get('/api/cards-all');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Test POST /api/cards
describe('POST /api/cards', () => {
  it('debería crear una nueva card', async () => {
    const nuevaCard = {
      card_title: 'Test Card',
      card_description: 'Una descripción de prueba',
      card_ubicacion: 'Calle Falsa 123',
      card_linkubic: 'https://maps.google.com',
      card_horario: '8 a 17 hs',
      card_contacto: 'contacto@prueba.com',
      card_info: 'Info de prueba',
      card_city: 'Ciudad Test',
      card_category: 'Categoria Test'
    };

    const res = await request(app).post('/api/cards').send(nuevaCard);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('card');
    expect(res.body.card.card_title).toBe('Test Card');
  });
});