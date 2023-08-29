const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const azureEndpoint = 'YOUR_AZURE_API_ENDPOINT';
const subscriptionKey = 'YOUR_AZURE_SUBSCRIPTION_KEY';

app.get('/', (req, res) => {
    // Serve your HTML form here
    res.sendFile(__dirname + '/index.html');
});

app.post('/analyze', async (req, res) => {
    const text = req.body.text;

    const response = await axios.post(`${azureEndpoint}/sentiment`, {
        documents: [
            {
                language: 'en',
                id: '1',
                text: text,
            },
        ],
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
    });

    const sentimentScore = response.data.documents[0].score;
    const sentimentLabel = sentimentScore > 0.5 ? 'Positive' : sentimentScore < 0.5 ? 'Negative' : 'Neutral';

    res.send(`Sentiment: ${sentimentLabel} (Score: ${sentimentScore})`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
