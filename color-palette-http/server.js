const http = require('http')
const {randomColorPalette} = require('./file-reader')

http.createServer((req, res, err) => {
    if (err) {
        console.log(err)
    }
    res.write(JSON.stringify(randomColorPalette))
    res.end()
}).listen(4000)

