import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostDTO } from "../dto/PostDTO"
import { BaseError } from "../errors/BaseError"


export class PostController {
    constructor(
        private postDTO: PostDTO,
        private postBusiness: PostBusiness
    ) {}


    public getPost = async (req: Request, res: Response) => {
        try {
            const input = req.query.q as string | undefined

            const output = await this.postBusiness.getPost(input)

            res.status(200).send(output)
            // const input = {
            //     q: req.query.q as string | undefined
            // }

            // // const postBusiness = new PostBusiness()
            // const output = await this.postBusiness.getPost(input)

            // res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)

            } else {
                res.send("Erro inesperado")
            }
        }
    }
    //create
    public createPost = async (req: Request, res: Response) => {
        try {
            const input = this.postDTO.createPostInput(
                req.body.id,
                req.body.creatorId,
                req.body.content,
                req.body.likes,
                req.body.dislikes,
                req.body.created_at,
                req.body.updated_at
            )
            //const userBusiness = new PostBusiness()
            const output = await this.postBusiness.createPost(input)


            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)

            } else {
                res.send("Erro inesperado")
            }
        }
    }


    //  ** 

    public editPost = async (req: Request, res: Response) => {
        try {

            const input = this.postDTO.editPostInput(
                req.params.id,
                req.body.creatorId,
                req.body.content,
                req.body.likes,
                req.body.dislikes,
                req.body.created_at,
                req.body.updated_at

            )


            //const postBusiness = new PostBusiness()
            const output = await this.postBusiness.editPost(input)

            res.status(200).send(output)


        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)

            } else {
                res.send("Erro inesperado")
            }
        }
    }


    public deletePost = async (req: Request, res: Response) => {
        try {
            const input = {
                idToDelete: req.params.id
            }

            //const postBusiness = new PostBusiness()
            const output = await this.postBusiness.deletePost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}