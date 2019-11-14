const express = require('express');
const auth = require('./routes/auth');
const app = express();
const passport = require('passport');

app.use(passport.initialize());


require('./db');
require('./services/passport');


app.get("/", (req, res) => {
    res.send({
        hello: "world"
    });
});
app.use("/auth", auth);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is up and running"));