
let oscPort = null

let init = async () => {

    let ip = await (await fetch('ip')).text()

    oscPort = new osc.WebSocketPort({
        url: `ws://${ip}:3000`, // URL to your Web Socket server.
        metadata: true
    })

    oscPort.open()

    oscPort.on("message", function (oscMsg) {
        console.log("An OSC message just arrived!", oscMsg)
    })

    oscPort.on('ready', function () {

        console.log(`oscPort is ready (bind with ${ip}:3000)`)

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

}

init()






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






// document.querySelector('#b2').onclick = event => {
//
//     oscPort.send({
//         address: '/main',
//         args: [{ type: 'f', value: 2 }],
//     })
//
// }
//
// document.querySelector('#b3').onclick = event => {
//
//     oscPort.send({
//         address: '/main',
//         args: [{ type: 'f', value: 3 }],
//     })
//
// }

let onButton = event => {

    let div = event.currentTarget

    let value = parseFloat(div.dataset.index)

    oscPort.send({
        address: '/main',
        args: [{ type: 'f', value }],
    })

}

for (let div of document.querySelectorAll('.scene')) {

    let value = div.dataset.index

    div.onclick = onButton

}
