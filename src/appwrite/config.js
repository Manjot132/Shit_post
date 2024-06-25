import { Client,Storage,Databases,Query } from "appwrite";
import conf from "../conf/config";

export class AppwriteService{
    Client = new Client();
    database;
    bucket;
    constructor(){
        this.Client.setEndpoint(conf.endpoint).setProject(conf.projectId);
        this.database = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
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
    async updatePost(slug,{title,content,image,status,userId}){
        try {
            return await this.database.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                image,
                status,
                userId
            })
        } catch (error) {
            console.log("AppwriteService :: updatePost :: error",error);
        }
    }
async deletePost(slug){
    try {
        await this.database.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
        return true;
    } catch (error) {
        return false;
    }
}

async getPost(slug){
    try {
        return await this.database.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
    } catch (error) {
        console.log("AppwriteService :: getPost :: error",error);
    }

}
async getPosts(queries=Query.equal("status","active")){
    try {
        return await this.database.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries);
    } catch (error) {
        console.log("AppwriteService :: getPosts :: error",error);
        return false;
    }
}
// file upload servies introduced
async uploadFile(file){
try {
    return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
} catch (error) {
    console.log("AppwriteService :: uploadFile :: error",error);
}
}

async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(conf.appwriteBucketId,fileId);
        return true;
    } catch (error) {
        console.log("AppwriteService :: deleteFile :: error",error);
        return false;
    }
}

}
const service=new AppwriteService();
export default service;
