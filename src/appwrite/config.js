import { Client,Storage,Databases } from "appwrite";
import conf from "../conf/config";

export class AppwriteService{
    Client = new Client();
    database;
    constructor(){
        this.Client.setEndpoint(conf.endpoint).setProject(conf.projectId);
        this.database = new Databases(this.Client);
    }
    async createPost({title,content,image,status,userId,slug}){
        try {
            return await this.database.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                    title,
                    content,
                    image,
                    status,
                    userId
            })
        } catch (error) {
            console.log("AppwriteService :: createPost :: error",error);
        }
    }
}
