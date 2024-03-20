const request = require('supertest');
const app = require("../app");
const {sequelize} = require("../models");
// buat bulk insert
const {queryInterface} = sequelize;
const BASE_URL = "/api/games"

// 1. Seeding data ke database test
// 2. Menjalankan test satu persatu
// 3. Hapus data dari database test (dikosongin)


// HOOKS

// Akan jalan sebelum test dimulai
beforeAll( async () => {

    try {
        await queryInterface.bulkInsert("Games", [
            {
                id: 1001,
                title: "Game A",
                categories: "AAA",
                year: 2000,
                platforms: "Platform A",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                id: 1002,
                title: "Game B",
                categories: "BBB",
                year: 2000,
                platforms: "Platform B",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                id: 1003,
                title: "Game C",
                categories: "CCC",
                year: 2000,
                platforms: "Platform C",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                id: 1004,
                title: "Game D",
                categories: "DDD",
                year: 2000,
                platforms: "Platform D",
                createdAt: new Date(),
                updatedAt: new Date()

            }
        ], {})
    }catch(err) {
        console.log(err);
    }
})

// Akan tereksekusi setelah test selesai
afterAll(async () => {
    try {
        await queryInterface.bulkDelete("Games", null);
    } catch(err) {
        console.log(err)
    }
})

// UNIT TESTING
describe("GET List games /api/games", () => {

    it("GET /api/games", (done) => {

        // supertest
        request(app)
            .get(`${BASE_URL}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const {body} = response;
                
                const {data, currentPage, totalData} = body;
                expect(data.length).toEqual(4);
                expect(currentPage).toEqual(1)
                expect(totalData).toEqual(4);
                done();
            })
            .catch(err => {
                done(err)
            }) 
    })

    it("GET /api/games with pagination", (done) => {

        request(app)
            .get(`${BASE_URL}?limit=1&page=1`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const {body} = response;
                const {data, currentPage, totalData} = body;

                expect(data.length).toEqual(1)
                expect(currentPage).toEqual(1)
                expect(totalData).toEqual(4)
                done();
            })
            .catch(err => {
                done(err)
            })
    })
})

describe("GET game by id /api/games/:id", () => {

    it("GET /api/games/:id", (done) => {

        request(app)
            .get(`${BASE_URL}/1001`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const {body} = response;
                const {data} = body;
                const {id, title, categories, year, platforms} = data;

                expect(id).toEqual(1001)
                expect(title).toBe("Game A")
                expect(categories).toBe("AAA")
                expect(year).toEqual(2000)
                expect(platforms).toBe("Platform A")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("TEST not found", (done) => {

        request(app)
            .get(`${BASE_URL}/9999`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then(response => {
                const {body} = response;
                const {name, message} = body;

                expect(name).toBe("Error Not Found")
                expect(message).toBe("Game Not Found")
                done();
            })
            .catch(err => {
                done(err)
            })
    })
})



