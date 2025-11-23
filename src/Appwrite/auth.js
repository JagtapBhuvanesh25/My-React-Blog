import {Client , Account , ID} from 'appwrite'
import conf from '../conf/conf'

export class Authservice {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
    }

    async createAccount({email , password , name}){
        try{
            const userAccount = await this.account.create({
                    userId: ID.unique(),
                    email,
                    password,
                    name, // optional
                });

            if(userAccount){
                //login krwa do
                return this.login(email , password)
            }else {
                return userAccount;
            }
        }catch(e){
            console.log("Appwrite Error :: Auth : Create Service");
        }
    }


    async login({email , password}){
        try {
            return await this.account.createEmailPasswordSession({email , password})
        } catch (error) {
            console.log("Appwrite Error :: Auth : Login Service");
            return false;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Error :: Auth : Currect Service");
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Error :: Auth : Logout Service");
            return false;
        }
    }
}

const authservice = new Authservice()

export default authservice