import express from 'express';
import { Addsong, getallartist, getallsong , getartist
        } from "../controller/common.js";

const router = express.Router();
router.post('/addsong',Addsong);
router.post("/getsongs",getallsong);
router.get('/getallartist',getallartist);
router.post('/artist/:id',getartist);
export default router;