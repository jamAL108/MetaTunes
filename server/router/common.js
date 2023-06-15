import express from 'express';
import { Addsong, getallartist, getallsong , getartist
        } from "../controller/common.js";

const router = express.Router();
router.post('/addsong',Addsong);
router.get('/getallartist',getallartist);
router.get('/artist/:id',getartist);
router.get("/getallsong",getallsong);
export default router;