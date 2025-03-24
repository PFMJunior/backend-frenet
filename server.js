const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');

const app = express();
app.use(cors());
app.use(express.json());

const cache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

app.post('/api/shipping/quote', async (req, res) => {
    const cacheKey = JSON.stringify(req.body);
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.json(cachedData);
    }

    try {
        const response = await axios.post(
            'https://private-anon-a6bcc7c693-frenetapi.apiary-mock.com/shipping/quote',
            req.body,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    token: 'FC49AC79RA0CFR4981RAFF2RC4355276D92A',
                },
            }
        );
        cache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Erro na cotação' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});