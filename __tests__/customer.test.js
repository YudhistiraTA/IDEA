const request = require('supertest');
const express = require('express');
const app = require('../index');
const { Product } = require('../models');
const fs = require('fs');

// describe('POST public/register', function () {
//     it('Successful registration', async function () {
//         const response = await request(app)
//             .post('/public/register')
//             .send({ email: 'TEST@mail.com', password: '12345' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//         expect(response.status).toEqual(201);
//         expect(response.body).toHaveProperty("message", "Registration success");
//         expect(response.body).toHaveProperty("id");
//         expect(typeof response.body.id).toBe("number");
//         expect(response.body).toHaveProperty("email");
//         expect(typeof response.body.email).toBe("string");
//     });
//     it('Email already in use', async function () {
//         const response = await request(app)
//             .post('/public/register')
//             .send({ email: 'TEST@mail.com', password: '12345' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//         expect(response.status).toEqual(409);
//         expect(response.body.errors).toEqual("Email is already in use");
//     });
//     it('Email is null', async function () {
//         const response = await request(app)
//             .post('/public/register')
//             .send({ password: '12345' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//         expect(response.status).toEqual(400);
//         expect(response.body.errors).toEqual(["Email is required"]);
//     });
//     it('Password is null', async function () {
//         const response = await request(app)
//             .post('/public/register')
//             .send({ email: 'TEST2@mail.com' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//         expect(response.status).toEqual(400);
//         expect(response.body.errors).toEqual(["Password is required"]);
//     });
//     it('Email is empty', async function () {
//         const response = await request(app)
//             .post('/public/register')
//             .send({ email: '', password: '12345' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//         expect(response.status).toEqual(400);
//         expect(response.body.errors).toEqual(["Email is required"]);
//     });
//     it('Password is empty', async function () {
//         const response = await request(app)
//             .post('/public/register')
//             .send({ email: 'TEST2@mail.com', password: '' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//         expect(response.status).toEqual(400);
//         expect(response.body.errors).toEqual(["Password is required"]);
//     });
//     it('Invalid email format', async function () {
//         const response = await request(app)
//             .post('/public/register')
//             .send({ email: 'TEST2mail.com', password: '12345' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//         expect(response.status).toEqual(400);
//         expect(response.body.errors).toEqual(["Invalid email format"]);
//     });
// });
// describe('POST public/login', function () {
//     it('Successful login', async function () {
//         const response = await request(app)
//             .post('/public/login')
//             .send({ email: 'TEST@mail.com', password: '12345' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//         expect(response.status).toEqual(200);
//         expect(response.body).toHaveProperty("message", "Login success");
//         expect(response.body).toHaveProperty("access_token");
//     });
//     it('Invalid password', async function () {
//         const response = await request(app)
//             .post('/public/login')
//             .send({ email: 'TEST@mail.com', password: '12347' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//         expect(response.status).toEqual(401);
//         expect(response.body).toHaveProperty("message", "Invalid email or password");
//     });
//     it('Unregistered email', async function () {
//         const response = await request(app)
//             .post('/public/login')
//             .send({ email: 'TEST_FALSE@mail.com', password: '12345' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//         expect(response.status).toEqual(401);
//         expect(response.body).toHaveProperty("message", "Invalid email or password");
//     });
// });
describe('GET public/products', function () {
    beforeAll(async () => {
        const dummyData = JSON.parse(fs.readFileSync('./__tests__/dummyProducts.json'));
        await Product.bulkCreate(dummyData);
    })
    it('Successful paginated products fetch', async function () {
        const response = await request(app)
            .get('/user')
            .set('Accept', 'application/json')
        expect(typeof response.body).toBe('object');
    });
})