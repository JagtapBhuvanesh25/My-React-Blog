import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import RTE from '../RTE'
import Select from '../Select'
import Button from '../Button'
import Input from "../Input"
import appwriteService from '../../Appwrite/config'
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
	const userData = useSelector(state => state.user.userData)

	const submit = async (data) => {
		if(post){
			const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;

			if(file){
				appwriteService.deleteFile(post.featuredImage)
			}
			const dbpost = await appwriteService.updatePost(post.$id , { ...data , featuredImage: file ? file.$id : undefined})
			if(dbpost) navigate(`/post/${dbpost.$id}`)
		}else{
			const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;
			if(file){
				const fileId = (await file).$id
				data.featuredImage = fileId
				const dbpost = await appwriteService.createPost({...data, userId: userData.userId})
				if(dbpost) navigate(`/post/${dbpost.$id}`)
			}
		}
	}

	const slugTranform = useCallback((value) => {
		if(value && typeof(value) === 'string') return value.toLocaleLowerCase().replace(/\s/g , '-')
		return ''
	} , [])

	useEffect(() => {
		const subscription = watch((value , {name}) => {
			if(name === 'title') setValue('slug' , slugTranform(value.title) , {shouldValidate: true})
		})
		return () => {
			subscription.unsubscribe()
		}
	} , [watch , slugTranform , setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
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
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}