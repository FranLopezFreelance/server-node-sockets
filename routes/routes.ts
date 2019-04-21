import { Router, Request, Response } from "express";

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

    res.json({
        ok: true,
        text,
        user,
        id
    });
});

export default router;