import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    return this.databases.createDocument(
      conf.appwriteDatabaseID,
      conf.appwriteCollectionID,
      slug,
      { title, content, featuredImage, status, userId }
    );
  }

  async updatePost(id, { title, content, featuredImage, status }) {
    return this.databases.updateDocument(
      conf.appwriteDatabaseID,
      conf.appwriteCollectionID,
      id,
      { title, content, featuredImage, status }
    );
  }

  async deletePost(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        id
      );
      return true;
    } catch {
      return false;
    }
  }

  async getPost(id) {
    return this.databases.getDocument(
      conf.appwriteDatabaseID,
      conf.appwriteCollectionID,
      id
    );
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    return this.databases.listDocuments(
      conf.appwriteDatabaseID,
      conf.appwriteCollectionID,
      queries
    );
  }

  async uploadFile(file, { permissions } = {}) {
    return this.storage.createFile({
      bucketId: conf.appwriteBucketID,
      fileId: ID.unique(),
      file,
      permissions,
    });
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketID,
        fileId,
      });
      return true;
    } catch {
      return false;
    }
  }

  getFileViewUrl(fileId) {
    if (!fileId) return null;
    const base = conf.appwriteURL.replace(/\/$/, "");
    return `${base}/storage/buckets/${conf.appwriteBucketID}/files/${fileId}/view?project=${conf.appwriteProjectID}`;
  }

  async getFilePreview(fileId, options = {}) {
    if (!fileId) return null;
    return this.storage.getFilePreview({
      bucketId: conf.appwriteBucketID,
      fileId,
      ...(options || {}),
    });
  }
}

const service = new Service();
export default service;