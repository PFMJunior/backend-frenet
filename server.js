const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/shipping/quote', async (req, res) => {
    try {
        const response = await axios.post(
            'http://private-anon-a6bcc7c693-frenetapi.apiary-mock.com/shipping/quote',
            req.body,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    token: 'FC49AC79RA0CFR4981RAFF2RC4355276D92A',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Erro na cotação' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});