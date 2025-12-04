import React, { useCallback, useEffect, useState } from "react";
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
  const [preview, setPreview] = useState(null);
  const fallback = "https://via.placeholder.com/800x400?text=No+Image";

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

  useEffect(() => {
    let mounted = true;
    if (!post) {
      setPreview(null);
      return;
    }
    const fileId =
      post.featuredImage ||
      post.featured_image ||
      post.image ||
      post.coverImage ||
      post.cover_image ||
      null;
    if (!fileId) {
      setPreview(null);
      return;
    }
    const url = appwriteService.getFileViewUrl(fileId);
    if (mounted) setPreview(url);
    return () => {
      mounted = false;
    };
  }, [post]);

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="Title"
              className="mb-0"
              {...register("title", { required: true })}
            />

            <Input
              label="Slug"
              placeholder="Slug"
              className="mb-0"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTranform(e.currentTarget.value), { shouldValidate: true });
              }}
            />

            <div className="mt-2">
              <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            </div>
          </div>
        </div>

        <aside className="md:col-span-1 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">Featured Image</label>
            <div>
              <Input
                label=""
                type="file"
                className="mb-0"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
              />
            </div>

            {post && (
              <div className="w-full mt-2">
                <img
                  src={preview || fallback}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg border border-gray-700"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Select options={["active", "inactive"]} label="Status" className="mb-0" {...register("status", { required: true })} />
          </div>

          <div>
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </aside>
      </div>
    </form>
  );
}
