const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();
const app = express();

// don't forget to replace with your own database URL
const DB_URL = process.env.DB_URL;

mongoose.connect('mongodb://localhost:27017/gmc/student', {
 useNewUrlParser: true,
 useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB:', err));

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


app.get('/student', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
 catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/student', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/student/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/student/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});