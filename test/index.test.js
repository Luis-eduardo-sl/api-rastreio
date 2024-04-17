const request = require("supertest");
const express = require('express')

// const baseUrl = "http://127.0.0.1:3000";
const app= express();

const routes = require('../routes/deliveryRoutes')

app.use(express.json())
app.use('/deliveries', routes)

describe('GET /delivery', () =>{
    const novoDelivery={
        trackingNumber: "52400005",
        status: "preparando",
    }

    beforeAll(async ()=>{
        const response = await request(app).post("/deliveries").send(novoDelivery)
        console.log(response.body)
    })

    afterAll(async () =>{
        const response = await request(app).delete("/deliveries/52400005")
        response.body.deliveries
    })

    it('Deve retornar status 200', async ()=> {
        const response = await request(app).get('/deliveries/52400005')
        expect(response.statusCode).toBe(200)
        console.log(response.body);
    })

    it('Deve retornar o pedido criado', async() =>{
        const response = await request(app).get('/deliveries/52400005')
        console.log(response.body);
        expect(response.body.status).toBe(novoDelivery.status) 
      
    })
})

describe('POST /deliveries', ()=>{
    const novoDelivery={
        trackingNumber: "100520",
        status: "preparando",
    }

    afterAll(async ()=>{
        const response = await request(app).delete("/deliveries/100520")
        response.body.deliveries
    })

    it('Deve adicionar um novo pedido', async ()=>{
        const response = await request(app).post('/deliveries').send(novoDelivery)
        expect(response.statusCode).toBe(200)
        const deliveriesIncluido = response.body
        expect(deliveriesIncluido.trackingNumber).toBe(novoDelivery["trackingNumber"])
        expect(deliveriesIncluido.status).toBe(novoDelivery["status"])

    })
})

