import { Router, Request, Response } from "express";
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response) => {

    res.json({
        ok: true,
        message: 'GET ok'
    });
});

router.post('/mensajes', ( req: Request, res: Response) => {

    const text = req.body.text;
    const user = req.body.user;

    const payload = {
        user,
        text
    }

    const server = Server._instance;

    server.io.emit('new-message', payload );

    res.json({
        ok: true,
        text,
        user
    });
});

router.post('/mensajes/:id', ( req: Request, res: Response) => {

    const text = req.body.text;
    const user = req.body.user;
    const id = req.params.id;

    const payload = {
        user,
        text
    }

    const server = Server._instance;

    server.io.in( id ).emit('new-private-message', payload );

    res.json({
        ok: true,
        text,
        user,
        id
    });
});

export default router;