const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 8000;
const DB_URL = 'mongodb+srv://admin:admin@mynotes.zeocl.mongodb.net/MyNotes?retryWrites=true&w=majority';
const app = express();

//import routes
const noteRoutes = require('./Routes/NoteRoutes');
const userRoutes = require('./Routes/UserRoutes');

app.use(cors({

    origin: "*",
}));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//use routes
app.use("/notes",noteRoutes);
app.use("/users", userRoutes);

mongoose.connect(DB_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => {

    console.log("Database Connected Successfully...");
})
.catch((err) => {

    console.log("Dataabase Connection Failed!!!", err);
})

app.listen(PORT, () => {

    console.log(`The Application is running on port ${PORT}`);
})