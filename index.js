const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to Vyld" });
});

app.use('*', (req, res) => {
    res.status(404).json({ error: "Page not found" });
})

let Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
})