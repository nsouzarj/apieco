const express = require('express');
const cors = require('cors');

// App Initialization
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routes
const userRoutes = require('./routes/user.routes');

// Use Routes
app.use('/api/users', userRoutes);



// Setup Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

  console.log(`Servico iniciado na porta: ${PORT}`);
});

module.exports = app;