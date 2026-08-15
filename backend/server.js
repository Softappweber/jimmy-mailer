// =====================================================
// Jimmy Mailer v1
// Backend - Step 1B
// =====================================================

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;


// =====================================================
// Middleware
// =====================================================

app.use(cors());

app.use(express.json());


// =====================================================
// Health Check
// =====================================================

app.get('/', (req, res) => {

    res.json({
        success: true,
        application: 'Jimmy Mailer',
        version: '1.0.0',
        status: 'online'
    });

});


// =====================================================
// API Health Check
// =====================================================

app.get('/api/health', (req, res) => {

    res.json({
        success: true,
        service: 'Jimmy Mailer API',
        status: 'online'
    });

});


// =====================================================
// Start Server
// =====================================================

app.listen(PORT, () => {

    console.log(
        `Jimmy Mailer backend running on port ${PORT}`
    );

});
