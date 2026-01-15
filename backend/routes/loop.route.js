import express from "express"
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
import { comment, getAllLoops, like, uploadvideo } from "../controller/loop.controller.js";

const loopRouter = express.Router();


loopRouter.post("/upload", isAuth, upload.single("media"), uploadvideo)
loopRouter.get("/getAll", isAuth, getAllLoops)
loopRouter.get("/like/:loopId", isAuth, like)
loopRouter.post("/comment/:loopId", isAuth, comment)


export default loopRouter