require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
var cookieParser = require('cookie-parser');
var cors = require("cors");
var bodyParser = require("body-parser");



require("./models/db").connectDatabase();


app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require("express-session");
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))

app.use(cookieParser());


app.use("/", require("./routes/userRoute"));

const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middleware/error");
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Requested URL not found ${req.url}`, 404));
});
app.use(generatedErrors);


app.listen(process.env.PORT, () => {
    console.log("connected to server 8080")
});