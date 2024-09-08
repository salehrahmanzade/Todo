"use server"

import { getAllUsersApi } from "@/httpServices/authService";
import { getAllTodoApi } from "@/httpServices/todoService";
import setCookiesOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";


 interface dataPromise {
  users: [],
  todos: [],
}

export async function fetchCardData() {
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  try {
    const data = await Promise.all([
      getAllUsersApi(options),
      getAllTodoApi("",options)
    ]);

    const numberOfUsers = Number(data[0].users.length ?? "0");
    const numberOfPosts = Number(data[1].todos.length ?? "0");

    return {
      numberOfPosts,
      numberOfUsers,
    };
  } catch (error) {
    throw new Error("خطا در بارگذاری اطلاعات");
  }
}

export async function fetchLatestPosts() {

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const todos :{} = await getAllTodoApi("sort=latest&limit=5");
    return todos;
  } catch (error) {
    throw new Error("خطا در بارگذاری اطلاعات");
  }
}
