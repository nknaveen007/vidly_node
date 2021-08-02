const {Genre} = require('../../../model/genres')
const request = require('supertest')


let server;
describe('api/genres', () => {
    let arr1 = []
    beforeEach(() => {server = require('../../../index')})
    afterEach(async() => {
        server.close()
    })
    afterAll(async() => {
        await Genre.deleteMany({})
        arr1=[]
    })
    
    describe('GET/', () => {
        it('api/genres', async () => {
            await Genre.collection.insertMany([
                { genre: 'test1' },
                { genre: 'test2' }
            ])

            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            const arr = res.body
            arr.forEach(element => {
                arr1.push(element._id)
            });
        })
        
        it('api/genres', async () => {
           
            const res = await request(server).get(`/api/genres/1`)
            expect(res.status).toBe(404);
        })


    })
   

    describe('genres/post', () => {
        it('post the data', async () => {
            const res = await request(server).post('/api/genres').send({ genre: 'test1' })
            expect(res.status).toBe(401)
        })
    })
})