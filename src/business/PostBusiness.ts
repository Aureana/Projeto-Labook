import { PostDatabase } from "../database/PostDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post } from "../models/Post"
import { PostDB, UpdatedPost } from "../Types"

export class PostBusiness {

    public getPost = async (q: string | undefined) => {
        const postDatabase = new PostDatabase()
        const postsDB = await postDatabase.findPosts(q)

        const posts: Post[] = postsDB.map((postDB) => new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at
        ))

        return posts
    }

    public createPost = async (input: any) => {

        const { id, creatorId, content, likes, dislikes } = input

        // if (typeof id !== "string") {
        //     throw new Error("'id' deve ser string")
        // }

        // if (typeof creatorId !== "string") {
        //     throw new Error("'creatorId' deve ser string")
        // }

        // if (typeof content !== "string") {
        //     throw new Error("'duration' deve ser string")
        // }

        // if (typeof likes !== "number") {
        //     throw new Error("'likes' deve ser integer")
        // }

        // if (typeof dislikes !== "number") {
        //     throw new Error("'dislikes' deve ser integer")
        // }

        const postDatabase = new PostDatabase()
        const postDBExists = await postDatabase.findPostById(id)

        if (postDBExists) {
            throw new Error("'id' do post já existe")
        }

        const userDatabase = new PostDatabase()
        const userDBExists = await userDatabase.findUserById(creatorId)

        if (!userDBExists) {
            throw new Error("'id'do usuário não existe")
        }

        const newPost = new Post(
            id,
            creatorId,
            content,
            likes,
            dislikes,
            new Date().toISOString(),
            new Date().toISOString()
        )

        const newPostDB: PostDB = {
            id: newPost.getId(),
            creator_id: newPost.getCreatorId(),
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes(),
            created_at: newPost.getCreatedAt(),
            updated_at: newPost.getUpdatedAt()
        }

        postDatabase.insertPost(newPostDB)

        const output = {
            message: "Cadastro realizado com sucesso",
            user: newPost
        }

        return output

    }

    public editPost = async (input: any) => {

        const { 
            newId, 
            newContent, 
            newLikes, 
            newDislikes, 
            newUpdatedAt 
        } = input

        const postDatabase = new PostDatabase()

        if ( newId[0] !== "p") {
            throw new Error("'id' deve iniciar com a letra 'p'");
        }

        const postToEditDB = await this.postDatabase.findPostById(id)

        if (!postToEditDB) {
            throw new NotFoundError("id para editar não existe")
        }

        const post = new Post(
            postToEditDB.id,
            postToEditDB.creator_id,
            postToEditDB.content,
            postToEditDB.likes,
            postToEditDB.dislikes,
            postToEditDB.created_at,
            postToEditDB.updated_at
        )

        newId && post.setId(newId)
        newContent && post.setContent(newContent) 
        newLikes && post.setLikes(newLikes) 
        newDislikes && post.setDislikes(newDislikes) 
        newUpdatedAt && post.setUpdatedAt(newUpdatedAt)

        const updatePostDB: PostDB = {
            id: post.getId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            updated_at: post.getCreatedAt()
        }
        await this.postDatabase.updatePost(updatePostDB)

        const output = this.postDTO.EditPostOutputDTO(post)

        return output
        
    }

//**** */


    public deletePost = async (input: any) => {
        const { idToDelete } = input

        const postDatabase = new PostDatabase()
        const postDBExists = await postDatabase.findPostById(idToDelete )

        if (!postDBExists) {
            throw new BadRequestError("Idpost não encontrado")
        } else {

            await postDatabase.deletePostById(postDBExists.id)

            const output = {
                message: "Post deletado com sucesso"
            }
            return output
        }
    }
}