const fs = require("fs");

//reading the color palette file
fs.readFile('assets/data/color_ palette.json', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    let randomizedColorPalette = []
    //Randomly choosing five color objects and storing in file system
    for (let i = 0; i < 5; i++) {
        let colorObj = JSON.parse(data)
        randomizedColorPalette.push(colorObj[Math.floor(Math.random() * colorObj.length)])
    }
    //Writing the selected colors into new file
    fs.writeFileSync('assets/data/new_color_palette.json', JSON.stringify(randomizedColorPalette))
})

fs.readFile('assets/data/new_color_palette.json',(err,data)=>{
    if(err){
        console.log(err)
    }
    let color_palette = JSON.parse(data)
    console.log(color_palette)
})