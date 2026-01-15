import express from "express"
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
import { AllStory, getStoryByUserName, uploadStory, viewStory } from "../controller/story.controller.js";

const storyRouter = express.Router();


storyRouter.post("/upload", isAuth, upload.single("media"), uploadStory)
storyRouter.get("/getByUserName/:userName", isAuth, getStoryByUserName)
storyRouter.get("/getByUserName/:userName", isAuth, getStoryByUserName)
storyRouter.get("/getAll", isAuth, AllStory)
storyRouter.get("/view/:storyId", isAuth, viewStory)


export default storyRouter