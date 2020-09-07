const express = require('express');
const app = express();
const connectDB = require('./Database/MongoConnect')
const path = require('path')

connectDB()

// Middleware Init
app.use(express.json({extended: false}));

app.get("/", (req, res)=>res.send("🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆"));

app.use("/api/reg", require('./Authentication/Register'));
app.use("/api/login", require('./Authentication/Login'));
app.use("/api/secrets", require('./route/secrets'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'))

    // '*' means get for any route except paths declared above
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'cliend', 'build', 'index.html')))
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));