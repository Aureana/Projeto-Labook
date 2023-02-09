import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"


export interface CreatePostInputDTO {
    id:string,
    creatorId:string,
    content:string,
    likes:number,
    dislikes:number,
    created_at:string,
    updated_at:string
}
export interface CreatePostOutputDTO {
    message: string,
    post:{
        id:string,
        creatorId:string,
        content:string,
        likes:number,
        dislikes:number,
        created_at:string,
        updated_at:string
    }

}

export interface EditPostInputDTO{
    newId:string | undefined,
    newCreatorId:string | undefined,
    newContent:string | undefined,
    newLikes:number | undefined,
    newDislikes:number | undefined,
    newCreated_at:string | undefined,
    newUpdated_at:string  | undefined   
}

export interface EditPostOutputDTO{
    message: string,
    post:{
        id:string,
        creatorId:string,
        content:string,
        likes:number,
        dislikes:number,
        created_at:string,
        updated_at:string
    }
}

export class PostDTO{
    public createPostInput(
        id:unknown,
        creatorId:unknown,
        content:unknown,
        likes:unknown,
        dislikes:unknown,
        created_at:unknown,
        updated_at:unknown
        
    ): CreatePostInputDTO{
        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof creatorId !== "string") {
            throw new BadRequestError("'creatorId' deve ser string")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'duration' deve ser string")
        }

        if (typeof likes !== "number") {
            throw new BadRequestError("'likes' deve ser integer")
        }

        if (typeof dislikes !== "number") {
            throw new BadRequestError("'dislikes' deve ser integer")
        }

        const dto: CreatePostInputDTO = {
            id,
            creatorId,
            content,
            likes,
            dislikes,
        }
        return dto
    }
    public createPostOutput(post: Post):CreatePostOutputDTO {
        const dto: CreatePostOutputDTO = {
            message: "Post registrado com sucesso",
            post:{
                id: post.getId(),
                creatorId: post.getCreatorId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes()
            }
        }
        return dto
    }

    //  **

    public editPostInput (
        newId:unknown,
        newCreatorId:unknown,
        newContent:unknown,
        newLikes:unknown,
        newDislikes:unknown,
        newCreated_at:unknown,
        newUpdated_at:unknown 

    ){
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                throw new BadRequestError("'id' deve ser string")
            }
        }

        if (typeof  newCreatorId !== "string") {
            throw new BadRequestError("'creatorId' deve ser string")
        }

        if (typeof  newContent !== "string") {
            throw new BadRequestError("'duration' deve ser string")
        }

        if (typeof  newLikes !== "number") {
            throw new BadRequestError("'likes' deve ser integer")
        }

        if (typeof newDislikes !== "number") {
            throw new BadRequestError("'dislikes' deve ser integer")
        }
        if (newCreated_at !== undefined) {
            if (typeof newCreated_at !== "string") {
                throw new BadRequestError("'created_at' deve ser string")
            }
        }
        if (newUpdated_at !== undefined) {
            if (typeof newUpdated_at !== "string") {
                throw new BadRequestError("'update_at' deve ser string")
            }
        }
        const dto: EditPostInputDTO = {
        newId,
        newCreatorId,
        newContent,
        newLikes,
        newDislikes,
        newCreated_at,  
        newUpdated_at     
        }
        
        return dto       
       
    }
    public editPostOutput (post: Post): EditPostOutputDTO{
        const dto: EditPostOutputDTO = {
            message: "Post editado com sucesso",
            post:{
                id: post.getId(),
                creatorId: post.getCreatorId(),
                content: post.getContent(),
                likes: post.Likes(),
                dislikes: post.getDislikes(),
                created_at: post.getCreated_at,
                updated_at: post.getUpadate_at
            }
        }
        return dto

   
    }
    
}

//delete
    
