import { Router } from 'express';

const routes = Router();

routes.post('/login', (req, res) => {
    console.table(req.body);

});

export default routes;
