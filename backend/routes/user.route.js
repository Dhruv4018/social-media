import express from "express"

import { editProfile, follow, followingList, getAllNotification, getcurrent, getProfile, markAsRead, search, suggestedUser } from "../controller/user.controller.js";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
const userRouter = express.Router();


userRouter.get("/current", isAuth, getcurrent)
userRouter.get("/suggested", isAuth, suggestedUser)
userRouter.get("/getProfile/:userName", isAuth, getProfile)
userRouter.get("/follow/:targetUserId", isAuth, follow)
userRouter.post("/editProfile", isAuth, upload.single("profileImage"), editProfile)
userRouter.get("/followingList", isAuth, followingList)
userRouter.get("/search", isAuth, search)
userRouter.get("/getallNotifications", isAuth, getAllNotification)
userRouter.post("/markAsRead", isAuth, markAsRead)


export default userRouter