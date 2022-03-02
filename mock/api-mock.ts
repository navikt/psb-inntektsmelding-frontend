import express from 'express';
import cors from 'cors';
import mockedKompletthetsdata from './mockedKompletthetsdata';

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:8383',
    })
);

app.use('/mock/kompletthet', (req, res) => {
    res.send(mockedKompletthetsdata);
});

const port = 8082;
app.listen(port, () => {
    console.log('API-mock listening on port', port);
});
