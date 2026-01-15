import express from "express"
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
import { getAllMessage, getprevUserChats, sendMessage } from "../controller/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", isAuth, upload.single("image"), sendMessage)
messageRouter.get("/getAll/:receiverId", isAuth, getAllMessage)
messageRouter.get("/prevChats", isAuth, getprevUserChats)



export default messageRouter