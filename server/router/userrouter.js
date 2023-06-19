import express from 'express';
import { Login ,
         Register,
         addfavourites,
         getfavourites,
         removefavourites,
         getplaylists ,
         createplaylist
        } from "../controller/usercontroller.js";


const router = express.Router();
router.post("/login",Login);
router.post("/register",Register);
router.post("/addfavourites",addfavourites);
router.post("/removefavourites",removefavourites);
router.post("/getfavourites",getfavourites);
router.post("/getplaylists",getplaylists);
router.post("/createplaylist", createplaylist);

export default router;