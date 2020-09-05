const express = require('express');
const app = express();
const connectDB = require('./Database/MongoConnect')

connectDB()

// Middleware Init
app.use(express.json({extended: false}));

app.get("/", (req, res)=>res.send("🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆"));

app.use("/api/reg", require('./Authentication/Register'));
app.use("/api/login", require('./Authentication/Login'));
app.use("/api/secrets", require('./route/secrets'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));