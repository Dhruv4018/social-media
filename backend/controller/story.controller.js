import uploadOnCloudinary from "../config/cloudinary.js"
import Story from "../models/story.model.js"
import User from "../models/user.model.js"

export const uploadStory = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        const { mediaType } = req.body

        if (!req.file) {
            return res.status(400).json({ message: "media is required" })
        }

        const media = await uploadOnCloudinary(req.file.path)

        const story = await Story.create({
            author: req.userId,
            mediaType,
            media
        })


        user.story.push(story._id)
        await user.save()

        const populatedStory = await Story.findById(story._id)
            .populate("author", "name userName profileImage")
            .populate("viewers", "name userName profileImage")

        return res.status(201).json(populatedStory)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Story create error" })
    }
}

export const viewStory = async (req, res) => {
    try {
        const storyId = req.params.storyId
        const userId = req.userId

        const story = await Story.findById(storyId)
        if (!story) {
            return res.status(400).json({ message: "Story not found" })
        }

        // ✅ Author khud hai → viewers me add mat karo
        if (story.author.toString() !== userId.toString()) {
            const viewersId = story.viewers.map(id => id.toString())
            if (!viewersId.includes(userId.toString())) {
                story.viewers.push(userId)
                await story.save()
            }
        }

        const populatedStory = await Story.findById(story._id)
            .populate("author", "name userName profileImage")
            .populate("viewers", "name userName profileImage")

        return res.status(201).json(populatedStory)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Story viewers error" })
    }
}


export const getStoryByUserName = async (req, res) => {
    try {
        const userName = req.params.userName
        const user = await User.findOne({ userName })

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        const story = await Story.find({
            author: user._id

        }).populate("viewers author")

        return res.status(200).json(story)
    } catch (error) {
        return res.status(500).json({ message: "Story viewers  get by id error" })
    }
}

export const AllStory = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId)
        const followingIds = currentUser.following

        const stories = await Story.find({
            author: { $in: followingIds }
        }).populate("viewers author")
            .sort({ createdAt: -1 })

            return res.status(200).json(stories)
    } catch (error) {
           return res.status(500).json({ message: "AllStoryGet  error" })
    }
}