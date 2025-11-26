const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for development
        methods: ["GET", "POST"]
    }
});

const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic Routes
app.get('/', (req, res) => {
    res.send('NearPi Backend API is running!');
});

// API Routes Placeholder
app.use('/api/users', require('./routes/users'));
app.use('/api/services', require('./routes/services'));
app.use('/api/payments', require('./routes/payments'));

// Socket.io for Real-Time Updates
io.on('connection', (socket) => {
    console.log('A user connected for real-time updates');
    
    // Example: Send a real-time update
    // socket.emit('new_help_request', { message: 'New help request posted nearby!' });

    socket.on('disconnect', () => {
        console.log('User disconnected from real-time updates');
    });
});

// Placeholder for MongoDB Connection (Requires actual setup)
// const { MongoClient } = require('mongodb');
// const uri = "mongodb://localhost:27017"; 
// const client = new MongoClient(uri);

// async function connectDB() {
//     try {
//         await client.connect();
//         console.log("Connected successfully to MongoDB server");
//     } catch (e) {
//         console.error("Could not connect to MongoDB", e);
//     }
// }
// connectDB();


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Access API at http://localhost:${PORT}`);
});

// Dummy Routes for Starter Kit
app.use('/api/users', (req, res) => {
    if (req.path === '/login' && req.method === 'POST') {
        return res.json({ success: true, token: 'dummy_jwt_token', user: { id: 1, username: req.body.username } });
    }
    res.status(404).send('Not Found');
});

app.use('/api/services', (req, res) => {
    if (req.path === '/nearby' && req.method === 'GET') {
        // Dummy GeoJSON response
        return res.json({ 
            results: [
                { id: 101, title: 'Electrician Service', price: 0.5, price_pi: 0.05, location: { lat: 24.7136, lng: 46.6753 } },
                { id: 102, title: 'Plumbing Help', price: 0.3, price_pi: 0.03, location: { lat: 24.7150, lng: 46.6780 } }
            ]
        });
    }
    res.status(404).send('Not Found');
});

app.use('/api/payments', (req, res) => {
    if (req.path === '/pi/initiate' && req.method === 'POST') {
        return res.json({ success: true, message: 'Pi Payment initiated (Dummy)' });
    }
    res.status(404).send('Not Found');
});
