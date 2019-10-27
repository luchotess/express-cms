import express, { json } from 'express';
import { config }        from 'config';
import authRouter from 'auth/routes'
const server = express();

server.use(json());

server.use('/auth', authRouter);

server.get('/health', (req, res) => {
    res.send('ok');
});

server.listen(config.port, () => console.log(`Server listening on port ${config.port}`));
