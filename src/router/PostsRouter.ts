import express from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDatabase";
import { PostDTO } from "../dto/PostDTO";


export const postsRouter = express.Router()

const postsController = new PostController(
    new PostDTO(),
    new PostBusiness(
        // new PostDTO(),
        // new PostDatabase()
    )

)

postsRouter.get("/", postsController.getPosts)
postsRouter.post("/", postsController.getPosts)
postsRouter.put("/:id", postsController.editPost)
postsRouter.delete("/:id", postsController.deletePost)