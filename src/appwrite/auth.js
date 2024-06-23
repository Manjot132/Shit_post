import conf from "../conf/config";
import { Client, Account , ID } from "appwrite";

export class Authservice{
   client = new Client();
   account;
   construcor(){
      this.client.setEndpoint(conf.endpoint).setProject(conf.projectId);
      this.account = new Account(this.client);
   }

   async createAccount({userId,mail,name}){
      try {
         const response = await this.account.create(ID.unique(),mail, password,name);
         if(response){
             return await this.login({userId,mail});
         }else {
            return  userAccount;
         }
     } catch (error) {
         throw error;
      } 
      
   }


   async login({email, password}) {
      try {
          return await this.account.createEmailSession(email, password);
      } catch (error) {
          throw error;
      }
  }
  async currentuser(){
   try {
      return this.account.get();
   } catch (error) {
      throw error;
   }
   return null;
  }

  async logout() {

   try {
       await this.account.deleteSessions();
   } catch (error) {
       console.log("Appwrite serive :: logout :: error", error);
   }
}

}


const authservice = new Authservice();
export default authservice;