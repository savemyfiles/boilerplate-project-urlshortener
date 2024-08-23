require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const DNS = [

];




// Your first API endpoint
app.post('/api/shorturl', function (req, res) {
    const url = req.body.url;

    try {
        new URL(url);

        if (!(/^(https?:\/\/)/.test(url))) {
            throw new Error();
        }

        const data = { original_url: url, short_url: DNS.length }

        DNS.push(data);
        res.json(data);

    } catch (error) {
        res.json({ error : 'invalid url' })
    }
});

app.get('/api/shorturl/:url', function (req, res) {
    const url = req.params.url;

    try {
        const entry = DNS.find((item) => parseInt(item.short_url) === parseInt(url))

        if (entry) {
            res.redirect(entry.original_url);
        } else {
            res.json({ error: 'Short URL not found' });
        }

    } catch (error) {
        res.json({ error : 'Error' })
    }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
