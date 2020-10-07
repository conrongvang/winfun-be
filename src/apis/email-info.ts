import express, { Request, Response } from 'express';
import fs from 'fs'
import path from 'path'
import { writeIntoJSONFile } from '../utils';

const router = express.Router();

router.get('/fetch_email_config', async (_req: Request, res: Response) => {
    try{
        const emailConfigPath = path.resolve("./src/emailConfig.json")
        var content = JSON.parse(fs.readFileSync(emailConfigPath, 'utf8'));
        /** Shouldn't send the password to client */
        delete content.hostEmailPassword
        res.status(200).json({code: 0, data: content});
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

router.post('/update_email_config', async (req: Request, res: Response) => {
    try{
        const { receiveEmails, emailSubject } = req.body
        const newEmailConfig : any = {}
        if(receiveEmails) newEmailConfig.receiveEmails = receiveEmails;
        if(emailSubject) newEmailConfig.emailSubject = emailSubject;

        const emailConfigPath = path.resolve("./src/emailConfig.json")
        const content = writeIntoJSONFile(emailConfigPath, newEmailConfig)
        res.status(200).json({code: 0, data: content});
    }
    catch(err){
        res.status(200).json({code: 1, message: err.message});
    }
})

export const EmailInfoAPIs = router;