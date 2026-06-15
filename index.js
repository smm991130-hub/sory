const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// In-memory storage (production da MongoDB yoki PostgreSQL ishlating)
let users = [];
let messages = [];
let listings = [];

// REST API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// User registration
app.post('/api/auth/register', (req, res) => {
  const { name, phone, cardNumber } = req.body;
  
  // Check if user exists
  const existingUser = users.find(u => u.phone === phone);
  if (existingUser) {
    return res.json({ user: existingUser, isNew: false });
  }
  
  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    phone,
    cardNumber,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  res.json({ user: newUser, isNew: true });
});

// Get messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Get listings
app.get('/api/listings', (req, res) => {
  res.json(listings);
});

// Create listing
app.post('/api/listings', (req, res) => {
  const listing = {
    id: `listing_${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  listings.push(listing);
  io.emit('new_listing', listing);
  res.json(listing);
});

// Delete listing
app.delete('/api/listings/:id', (req, res) => {
  listings = listings.filter(l => l.id !== req.params.id);
  io.emit('listing_deleted', req.params.id);
  res.json({ success: true });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Send existing messages to new user
  socket.emit('initial_messages', messages);
  
  // Handle new message
  socket.on('send_message', (data) => {
    const message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      timestamp: new Date().toISOString()
    };
    messages.push(message);
    
    // Broadcast to all users
    io.emit('new_message', message);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});