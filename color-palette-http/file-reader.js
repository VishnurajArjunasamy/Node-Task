const fs = require('fs')

let data = fs.readFileSync('assets/data/color_ palette.json')
let randomColorPalette = []
for (let i = 0; i < 5; i++) {
    let colors = JSON.parse(data)
    randomColorPalette.push(colors[Math.floor(Math.random() * colors.length)])
}

module.exports={randomColorPalette}