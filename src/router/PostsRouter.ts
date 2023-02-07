import express from "express";
import { PostController } from "../controller/PostController";


export const postsRouter = express.Router()

const postsController = new PostController()

postsRouter.get("/", postsController.getPosts)
postsRouter.post("/", postsController.getPosts)
postsRouter.put("/:id", postsController.editPost)
postsRouter.delete("/:id", postsController.deletePost)