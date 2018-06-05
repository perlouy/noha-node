#!/usr/bin/env node

require('colors')

let ip = require('ip')

let Path = require('path')
let express = require('express')
let osc = require('osc')
let WebSocket = require("ws")

let app = express()

app.get('/', (req, res) => {

    res.sendFile(Path.join(__dirname, './src/view/index.html'))

})

app.get('/ip', (req, res) => {

    res.send(ip.address())

})

app.use(express.static('static'))

let server = app.listen(3000, () => {

    console.log(`the app run on ${ip.address().red}:3000`.green)

})

let wss = new WebSocket.Server({

    server: server

})

wss.on("connection", socket => {

    let socketPort = new osc.WebSocketPort({
        socket: socket,
        metadata: true
    })

    socketPort.on("message", oscMsg => {

        udpPort.send(oscMsg, "224.0.0.0", 10000)

    })

})








// UDP (interface node </> TouchDesigner)

let udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true,
    multicastMembership: ['224.0.0.0'],
})

udpPort.open()


let udpSendFloat = (value, address = '/main') => {

    udpPort.send({

        address,
        args: [{ type: 'f', value }],

    }, "224.0.0.0", 10000)

}

udpPort.on('ready', () => {

    setInterval(() => udpSendFloat(Math.random(), '/random'), 1000)

})
