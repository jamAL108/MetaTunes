import express from 'express';
import { Addsong, getallartist, getallsong
        } from "../controller/common.js";

const router = express.Router();
router.post('/addsong',Addsong);
router.get('/getallartist',getallartist);
router.get("/getallsong",getallsong);
export default router;