"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createPost(content:string, imageUrl:string) {
    try {
        const userId = await getDbUserId();
        const post = await prisma.post.create({
            data:{
                content: content,
                image: imageUrl,
                authorId: userId,
                
            
            }
        })
        revalidatePath("/"); // clear homepage cache
        return { success: true, post };
    } catch (error) {
        console.error("Failed to create post:", error);
        return {success: false, error: "Failed to create post" };
    }
}

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt:"desc"
            },
            include:{
                author:{
                    select:{
                        name: true,
                        image: true,
                        username: true
                    }
                },
                comments: {
                    include:{
                        author:{
                            select:{
                                id: true,
                                username:true,
                                image:true,
                                name:true
                            }
                        }
                    },
                    orderBy:{
                        createdAt: "asc",
                    }
                },
                likes: {
                    select:{
                        userId: true
                    }
                },
                _count:{
                    select:{
                        likes: true,
                        comments: true
                    }
                }

            }
        });
        return posts;
    } catch (error) {
        console.log("Eerror in getPosts:", error);
        throw new Error("Failed to fetch posts");
    }
}