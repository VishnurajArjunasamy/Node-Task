var express = require("express");
var app = express();
require("dotenv").config();

const buddies = require("./routes/buddyRoute");

const port = process.env.PORT;

app.use(express.json());

app.use("/buddies", buddies);

app.listen(port, () => {
  console.log("Server started listening in port " + port);
  // cdwAce23Budies=[]
  // fs.writeFileSync('assets/data/cdw_ace23_buddies.json',JSON.stringify(cdwAce23Budies))
});
