import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import RTE from "../RTE";
import Select from "../Select";
import Button from "../Button";
import Input from "../Input";
import appwriteService from "../../Appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.userData);

  const submit = async (data) => {
    const fileToUpload = data?.image?.[0] ?? null;
    let uploadedFile = null;
    if (fileToUpload) {
      uploadedFile = await appwriteService.uploadFile(fileToUpload);
    }

    if (post) {
      if (uploadedFile && post.featuredImage) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const dbpost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: uploadedFile ? uploadedFile.$id : post.featuredImage,
      });

      if (dbpost) navigate(`/post/${dbpost.$id}`);
    } else {
      if (uploadedFile) {
        data.featuredImage = uploadedFile.$id;
        const dbpost = await appwriteService.createPost({
          ...data,
          userId: userData?.$id,
        });
        if (dbpost) navigate(`/post/${dbpost.$id}`);
      }
    }
  };

  const slugTranform = useCallback((value) => {
    if (value && typeof value === "string") return value.toLocaleLowerCase().replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") setValue("slug", slugTranform(value.title), { shouldValidate: true });
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") subscription.unsubscribe();
    };
  }, [watch, slugTranform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input label="Title :" placeholder="Title" className="mb-4" {...register("title", { required: true })} />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTranform(e.currentTarget.value), { shouldValidate: true });
          }}
        />

        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            {post.featuredImage && (
              <img src={appwriteService.getFilePrev(post.featuredImage)} alt={post.title} className="rounded-lg" />
            )}
          </div>
        )}

        <Select options={["active", "inactive"]} label="Status" className="mb-4" {...register("status", { required: true })} />

        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}