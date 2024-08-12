const express= require("express");
const app = express();
const db =require("./db");
var cors = require('cors')
const userdb =require("./models/User");
const notedb =require("./models/Note");
 
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/auth" , require("./routes/auth"));
app.use("/api/note" , require("./routes/note"))



app.listen("5000");