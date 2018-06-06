
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



document.querySelector('#b1').onclick = event => {

    oscPort.send({
        address: '/main',
        args: [{ type: 'f', value: 1 }],
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

 document.querySelector('#b4').onclick = event => {

     oscPort.send({
         address: '/main',
         args: [{ type: 'f', value: 4 }],
     })

 }

 document.querySelector('#b5').onclick = event => {

     oscPort.send({
         address: '/audio',
         args: [{ type: 'f', value: 1 }],
     })

 }

  document.querySelector('#b6').onclick = event => {

      oscPort.send({
          address: '/audio',
          args: [{ type: 'f', value: 2 }],
      })

  }

  document.querySelector('#b7').onclick = event => {

      oscPort.send({
          address: '/audio',
          args: [{ type: 'f', value: 3 }],
      })

  }

  document.querySelector('#b8').onclick = event => {

      oscPort.send({
          address: '/audio',
          args: [{ type: 'f', value: 4 }],
      })

  }

// let onButton = event => {
//
//     let div = event.currentTarget
//
//     let value = parseFloat(div.dataset.index)
//
//     oscPort.send({
//         address: '/scene',
//         args: [{ type: 'f', value }],
//     })
//
// }
//
// for (let div of document.querySelectorAll('.scene')) {
//
//     let value = div.dataset.index
//
//     div.onclick = onButton
//
// }
