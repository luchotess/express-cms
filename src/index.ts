import express, { json } from 'express';
import { CONFIG }        from 'config';
import authRouter        from 'auth/routes';
import UserRouter        from 'users/routes';
import { connectDb }     from 'database/connection';

const server = express();
server.use(json());

server.use('/api/auth', authRouter);
server.use('/api/users', UserRouter);

server.get('/health', (req, res) => {
    res.send('ok');
});

connectDb().then(async () => {
    server.listen(CONFIG.PORT, () =>
        console.log(`Server listening on port ${CONFIG.PORT}`)
    );
});

