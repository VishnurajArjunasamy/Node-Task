import { readFile, readFileSync, writeFileSync } from "fs";
import getRandomElements from "random-elements-array";

//reading the color palette file
readFile('assets/data/color_palette.json', (err, data) => {
    if (err) {
        console.log(err)
    }
    let randomizedColorPalette = JSON.parse(data)
    //Randomly choosing five color objects with random-elements-array package
    randomizedColorPalette=getRandomElements(randomizedColorPalette,5)
    //Writing the selected colors into new file 
    writeFileSync('assets/data/new_color_palette.json', JSON.stringify(randomizedColorPalette))
})
readFileSync('assets/data/new_color_palette.json',(err,data)=>{
    if(err){
        console.log(err)
    }
    let colorPalette = JSON.parse(data) 
    console.log(colorPalette)
})
