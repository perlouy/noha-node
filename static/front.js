
let oscPort = new osc.WebSocketPort({
    url: "ws://localhost:3000", // URL to your Web Socket server.
    metadata: true
})

oscPort.open()

oscPort.on("message", function (oscMsg) {
    console.log("An OSC message just arrived!", oscMsg)
})

oscPort.on("ready", function () {
    oscPort.send({
        address: "/carrier/frequency",
        args: [
            {
                type: "f",
                value: 440
            }
        ]
    })
})






document.querySelector('#b1').onclick = () => {

    oscPort.send({
        address: "/carrier/frequency",
        args: [
            {
                type: "f",
                value: Math.random(),
            }
        ]
    })

}


document.querySelector('#f1 button').onclick = () => {

    let value = parseFloat(document.querySelector('#f1 input').value)

    oscPort.send({
        address: '/main',
        args: [{ type: 'f', value }],
    })

}






document.querySelector('#b2').onclick = event => {

    oscPort.send({
        address: '/main',
        args: [{ type: 'f', value: 2 }],
    })

}

document.querySelector('#b3').onclick = event => {

    oscPort.send({
        address: '/main',
        args: [{ type: 'f', value: 3 }],
    })

}
