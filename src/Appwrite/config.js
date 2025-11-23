import {Client , ID , Databases , Storage, Query} from 'appwrite'
import conf from '../conf/conf'

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument({
                databaseId: conf.appwriteDatabaseID,
                collectionId: conf.appwriteTableID,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument({
                databaseId: conf.appwriteDatabaseID,
                collectionId: conf.appwriteTableID,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appwriteDatabaseID,
                collectionId: conf.appwriteTableID,
                documentId: slug
            });
            return true;
        } catch (e) {
            return  false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument({
                databaseId: conf.appwriteDatabaseID,
                collectionId: conf.appwriteTableID,
                documentId: slug
            });
        } catch (error) {
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments({
                databaseId: conf.appwriteDatabaseID,
                collectionId: conf.appwriteTableID,
                queries
            });
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(File){
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketID,
                fileId: ID.unique,
                file: File
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(FileId){
        try {
            await this.storage.deleteFile({
                bucketId: conf.appwriteBucketID,
                fileId: FileId
            });
        } catch (error) {
            throw error;
        }
    }

    getFilePrev(FileId){
        return this.storage.getFilePreview({
            bucketId: conf.appwriteBucketID,
            fileId: FileId
        })
    }
}

const service = new Service();

export default service;