const supertest = require('supertest')
const server = require('../server.js')
const request = require('express')

test('should accept userid and password and should signup succeessfully',  () => {
    expect(Index(2,5)).toBe(7)

    describe('username and password', () => {
        test("should have username", async () => {
            const response = await request(server).post('/admin/signup').send({
                
            })
            expect(response.statusCode).toBe(200)
        })
    })
})
