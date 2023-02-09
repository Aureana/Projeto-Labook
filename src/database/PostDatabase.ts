import { PostDB, UpdatedPost, UserDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {

    public static TABLE_POST = "posts"
    public static TABLE_USER = "users"
   //metodos 
    //get e post
    public async findPosts(q: string | undefined) {
       
        if (q) {
            const result: PostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .where("content", "LIKE", `%${q}%`)

            return result

        } else {
            const result: PostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POST)

                return result
        }        
    }
//get 
    public async findPostById(id: string | undefined){
        const [postDBExists]: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where({ id })
        return postDBExists
    }

    // public async findUserById(creatorId: string | undefined): Promise<PostDB | undefined> {
    //     const [userDBExists]: PostDB[] | undefined[] = await BaseDatabase
    //         .connection(PostDatabase.TABLE_POST)
    //         .where({ id: creatorId })
    //     return userDBExists
    // }
    public async findUserById(id: string | undefined): Promise<UserDB | undefined> {
        const [userDBExists]: UserDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_USER)
            .where({ id })
        return userDBExists
    }
    //post create
    public async insertPost(newPostDB: PostDB){
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .insert(newPostDB)
    }
//edit
    public async editPost(newPostDB: UpdatedPost, id: string){
        await BaseDatabase.connection(PostDatabase.TABLE_POST)
            .update(newPostDB)
            .where({ id })
    }
 //delete
 public async deletePost(id: string): Promise<void> {
    await BaseDatabase
        .connection(PostDatabase.TABLE_POST)
        .del()
        .where({ id })
 }

}