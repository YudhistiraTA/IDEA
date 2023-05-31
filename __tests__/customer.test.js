const request = require('supertest');
const express = require('express');
const app = require('../index');
const { Product, Customer, CustomerProduct } = require('../models');
const fs = require('fs');

describe('POST public/register', function () {
    beforeAll(async () => {
        await Customer.destroy({
            where: {},
            restartIdentity: true,
            truncate: true,
            cascade: true
        });
    })
    it('Successful registration', async function () {
        const response = await request(app)
            .post('/public/register')
            .send({ email: 'TEST@mail.com', password: '12345' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("message", "Registration success");
        expect(response.body).toHaveProperty("id");
        expect(typeof response.body.id).toBe("number");
        expect(response.body).toHaveProperty("email");
        expect(typeof response.body.email).toBe("string");
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
});
describe('POST public/login', function () {
    it('Successful login', async function () {
        const response = await request(app)
            .post('/public/login')
            .send({ email: 'TEST@mail.com', password: '12345' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("message", "Login success");
        expect(response.body).toHaveProperty("access_token");
    });
    it('Invalid password', async function () {
        const response = await request(app)
            .post('/public/login')
            .send({ email: 'TEST@mail.com', password: '12347' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(401);
        expect(response.body).toHaveProperty("message", "Invalid email or password");
    });
    it('Unregistered email', async function () {
        const response = await request(app)
            .post('/public/login')
            .send({ email: 'TEST_FALSE@mail.com', password: '12345' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(response.status).toEqual(401);
        expect(response.body).toHaveProperty("message", "Invalid email or password");
    });
});
describe('GET public/products', function () {
    beforeAll(async () => {
        await Product.destroy({
            where: {},
            restartIdentity: true,
            truncate: true,
            cascade: true
        });
        const dummyData = JSON.parse(fs.readFileSync('./__tests__/dummyProducts.json'));
        await Product.bulkCreate(dummyData);
    })
    it('Successful paginated products fetch', async function () {
        const response = await request(app)
            .get('/public/products')
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(typeof response.body).toBe('object');
        expect(response.body).toHaveProperty('currentPage', 1);
        expect(typeof response.body.products).toBe('object');
        expect(response.body.products).toHaveLength(8);
    });
    it('Successful paginated products page 3 fetch', async function () {
        const response = await request(app)
            .get('/public/products')
            .query({ page: 2 })
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(typeof response.body).toBe('object');
        expect(response.body).toHaveProperty('currentPage', 2);
        expect(typeof response.body.products).toBe('object');
        expect(response.body.products).toHaveLength(8);
    });
    it('Successful filtered paginated products fetch', async function () {
        const response = await request(app)
            .get('/public/products')
            .query({ filter: 2 })
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(typeof response.body).toBe('object');
        expect(response.body).toHaveProperty('currentPage', 1);
        expect(typeof response.body.products).toBe('object');
        expect(response.body.products).not.toHaveLength(0);
        expect(response.body).toHaveProperty(['products', 0, 'categoryId'], 2);
    });
    it('Successful product fetch by id', async function () {
        const response = await request(app)
            .get('/public/products/5')
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('message', 'Request success');
        expect(response.body).toHaveProperty('requestedData');
        expect(response.body.requestedData).toHaveProperty('id', 5);
    });
    it('Out of bound product fetch by id', async function () {
        const response = await request(app)
            .get('/public/products/100')
            .set('Accept', 'application/json')
        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty('message', 'Not found');
    });
});
describe.only('POST public/wishlist', function () {
    let access_token;
    beforeAll(async () => {
        await CustomerProduct.destroy({
            where: {},
            restartIdentity: true,
            truncate: true,
            cascade: true
        });
        const response = await request(app)
            .post('/public/login')
            .send({ email: 'master@mail.com', password: '12345' })
        access_token = response.body.access_token;
    });
    it('Successful add product to wishlist', async function () {
        const response = await request(app)
            .post('/public/wishlist/add/2')
            .set({ access_token, Accept: 'application/json' });
        console.log(response.body);
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('message', 'Product with ID 2 added to wishlist');
    });
    it('Invalid product ID while adding wishlist', async function () {
        const response = await request(app)
            .post('/public/wishlist/add/100')
            .set({ access_token, Accept: 'application/json' });
        console.log(response.body);
        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty('message', 'Not found');
    });
    it('Customer is not signed in yet', async function () {
        const response = await request(app)
            .post('/public/wishlist/add/2')
            .set({ Accept: 'application/json' });
        console.log(response.body);
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('message', 'Invalid Token');
    });
    it('access_token is invalid', async function () {
        const response = await request(app)
            .post('/public/wishlist/add/2')
            .set({ access_token: 'guhehe', Accept: 'application/json' });
        console.log(response.body);
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('message', 'Invalid Token');
    });
    it('Get all wishlist', async function () {
        const response = await request(app)
            .get('/public/wishlist')
            .set({ access_token, Accept: 'application/json' });
        console.log(response.body);
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('message', 'Request success');
        expect(response.body).toHaveProperty('requestedData');
        expect(response.body.requestedData).not.toHaveLength(0);
        expect(response.body.requestedData[0]).toHaveProperty('Product');
        expect(typeof response.body.requestedData[0].Product).toBe('object');
    });
});