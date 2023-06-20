import express from 'express';
import { Addsong, getallartist, getallsong , getartist , commonplaylist , getplaylist
        } from "../controller/common.js";

const router = express.Router();
router.post('/addsong',Addsong);
router.post("/getsongs",getallsong);
router.get('/getallartist',getallartist);
router.post('/artist/:id',getartist);
router.get("/commonplaylist",commonplaylist);
router.get("/playlist/:id",getplaylist);
export default router;