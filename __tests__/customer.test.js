const request = require('supertest');
const express = require('express');
const app = require('../index');

describe('POST public/register', function () {
    it('Successful registration', async function () {
        const response = await request(app)
            .post('/public/register')
            .send({ email: 'TEST@mail.com', password: '12345' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("message", "Registration success");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("email");
    });
    it('Email already in use', async function () {
        const response = await request(app)
            .post('/public/register')
            .send({ email: 'TEST@mail.com', password: '12345' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(409);
        expect(response.body.errors).toEqual("Email is already in use");
    });
    it('Email is null', async function () {
        const response = await request(app)
            .post('/public/register')
            .send({ password: '12345' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(400);
        expect(response.body.errors).toEqual(["Email is required"]);
    });
    it('Password is null', async function () {
        const response = await request(app)
            .post('/public/register')
            .send({ email: 'TEST2@mail.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(400);
        expect(response.body.errors).toEqual(["Password is required"]);
    });
    it('Email is empty', async function () {
        const response = await request(app)
            .post('/public/register')
            .send({ email: '', password: '12345' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(400);
        expect(response.body.errors).toEqual(["Email is required"]);
    });
    it('Password is empty', async function () {
        const response = await request(app)
            .post('/public/register')
            .send({ email: 'TEST2@mail.com', password: '' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(400);
        expect(response.body.errors).toEqual(["Password is required"]);
    });
    it('Invalid email format', async function () {
        const response = await request(app)
            .post('/public/register')
            .send({ email: 'TEST2mail.com', password: '12345' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(400);
        expect(response.body.errors).toEqual(["Invalid email format"]);
    });
})