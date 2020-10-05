import express, { Request, Response } from 'express';
import { addAnonymousComment, fetchAllAnonymousComments, updateCommentSequence, updateShowStatus } from '../db/services/ano-comment-services';
import { AnonymousComment } from '../models/ModelDeclare';

const router = express.Router();

router.post('/add_ano_comment', async (req: Request, res: Response) => {
    try{
        const comment : AnonymousComment = req.body
        const data = await addAnonymousComment(comment);
        res.status(200).json({ code: 0, data });
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

router.get('/fetch_all_ano_comments', async (_req: Request, res: Response) => {
    try{
        const data = await fetchAllAnonymousComments();
        res.status(200).json({ code: 0, data });
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

router.put('/update_ano_comment_show_stat', async (req: Request, res: Response) => {
    try{
        const { commentId, status } = req.body
        const data = await updateShowStatus(commentId, status);
        res.status(200).json({ code: 0, data });
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

router.put('/update_ano_comment_sequence', async (req: Request, res: Response) => {
    try{
        const { commentId, sequence } = req.body
        const data = await updateCommentSequence(commentId, sequence);
        res.status(200).json({ code: 0, data });
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

export const AnonymousCommentAPIs = router;