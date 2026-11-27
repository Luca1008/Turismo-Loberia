// tests/security.test.js
// Rutas de administración: sin sesión → 401; con sesión pero sin permiso → 403.
const request = require('supertest');
const express = require('express');
const { createToken } = require('../services/jwt');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', require('../routes/user.routes'));
app.use('/api', require('../routes/carousel.routes'));
app.use('/api/send', require('../routes/sendContent.routes'));
app.use('/api/subscriptions', require('../routes/subscription.routes'));

const bearer = (user) => ({ Authorization: `Bearer ${createToken(user)}` });
// IDs ficticios que no existen en la base.
const admin = bearer({ id: 900001, name: 'A', surname: 'A', email: 'a@test.com', role: 'admin' });
const superadmin = bearer({ id: 900002, name: 'S', surname: 'S', email: 's@test.com', role: 'superadmin' });

describe('Usuarios', () => {
  it('registrar admin: sin sesión 401, admin 403', async () => {
    const body = { name: 'X', surname: 'Y', email: 'nuevo@test.com', password: '12345678' };
    expect((await request(app).post('/api/user/register').send(body)).statusCode).toBe(401);
    expect((await request(app).post('/api/user/register').set(admin).send(body)).statusCode).toBe(403);
  });

  it('registrar admin: el superadmin pasa los permisos (llega a la validación)', async () => {
    const res = await request(app).post('/api/user/register').set(superadmin).send({});
    expect([400, 422]).toContain(res.statusCode);
  });

  it('listar admins: sin sesión 401, admin 403, superadmin 200', async () => {
    expect((await request(app).get('/api/user/admins')).statusCode).toBe(401);
    expect((await request(app).get('/api/user/admins').set(admin)).statusCode).toBe(403);
    expect((await request(app).get('/api/user/admins').set(superadmin)).statusCode).toBe(200);
  });

  it('ver usuario: sin sesión 401, otro usuario 403, el propio pasa', async () => {
    expect((await request(app).get('/api/user/900001')).statusCode).toBe(401);
    expect((await request(app).get('/api/user/900003').set(admin)).statusCode).toBe(403);
    // Pasa los permisos; 404 porque el usuario ficticio no existe.
    expect((await request(app).get('/api/user/900001').set(admin)).statusCode).toBe(404);
    expect((await request(app).get('/api/user/900003').set(superadmin)).statusCode).toBe(404);
  });

  it('modificar o borrar otro usuario: admin 403', async () => {
    const body = { name: 'X', surname: 'Y', email: 'x@test.com' };
    expect((await request(app).put('/api/user/900003').set(admin).send(body)).statusCode).toBe(403);
    expect((await request(app).delete('/api/user/900003').set(admin)).statusCode).toBe(403);
  });
});

describe('Carrusel, envíos y suscripciones', () => {
  it('carrusel: subir y borrar exigen sesión', async () => {
    expect((await request(app).post('/api/carousel').field('city', 'loberia')).statusCode).toBe(401);
    expect((await request(app).delete('/api/carousel/loberia')).statusCode).toBe(401);
  });

  it('carrusel: listar sigue siendo público', async () => {
    expect((await request(app).get('/api/carousel/loberia')).statusCode).not.toBe(401);
  });

  it('enviar contenido a suscriptores exige sesión', async () => {
    expect((await request(app).post('/api/send/send').field('subject', 'x')).statusCode).toBe(401);
  });

  it('datos de suscriptores exigen sesión', async () => {
    expect((await request(app).get('/api/subscriptions')).statusCode).toBe(401);
    expect((await request(app).get('/api/subscriptions/paginated')).statusCode).toBe(401);
    expect((await request(app).get('/api/subscriptions/stats')).statusCode).toBe(401);
    expect((await request(app).get('/api/subscriptions/stats').set(admin)).statusCode).toBe(200);
  });
});
