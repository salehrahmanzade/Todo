"use server"

import { getAllUsersApi } from "@/services/authService";
import { getAllTodoApi } from "@/services/todoService";
import setCookiesOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";

export async function fetchCardData() {
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  try {
    const data = await Promise.all([
      getAllUsersApi(options),
      getAllTodoApi(),
    ]);

    const numberOfUsers = Number(data[0].users.length ?? "0");
    const numberOfPosts = Number(data[1].todos.length ?? "0");


    return {
      numberOfPosts,
      numberOfUsers,
    };
  } catch (error) {
    console.error("خطا", error.response.data.message);
    throw new Error("خطا در بارگذاری اطلاعات");
  }
}

export async function fetchLatestPosts() {
  // Artificially delay a response for demo purposes.
  // Don't do this in production :)

  // console.log('Fetching revenue data...');
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // You can probably combine these into a single SQL query
  // However, we are intentionally splitting them to demonstrate
  // how to initialize multiple queries in parallel with JS.
  try {
    const { posts } = await getAllTodoApi("sort=latest&limit=5");
    return posts;
  } catch (error) {
    console.error("خطا", error);
    throw new Error(error?.resonse?.data?.message);
  }
}
