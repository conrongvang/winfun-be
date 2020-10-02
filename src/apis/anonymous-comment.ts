import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/register_now', async (req: Request, res: Response) => {
    try{
        res.status(200).json({code: 0});
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

export const AnonymousCommentAPIs = router;