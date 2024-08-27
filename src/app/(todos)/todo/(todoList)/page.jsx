import Pagination from "@/components/ui/Pagination";
import {getAllTodoApi} from "@/services/todoService";
import setCookiesOnReq from "@/utils/setCookieOnReq";
import {cookies} from "next/headers";
import queryString from "query-string";
import AddTodo from "@/components/todo/AddTodo";
import TodoList from "@/components/todo/TodoList";


// export const dynamic = "force-dynamic";
async function Page({searchParams}) {

    const queries = queryString.stringify(searchParams);
    // set headers:
    const cookieStore = cookies();
    const options = setCookiesOnReq(cookieStore);


    const {todos, totalPages} = await getAllTodoApi(queries, options);


    const {q: searchValue} = searchParams;

    const resultsText = todos.length > 1 ? "نتایج" : "نتیجه";

    return (
        <>
            {searchValue ? (
                <p className="mb-4 text-secondary-700">
                    {todos.length === 0
                        ? "هیچ تسکی با این مشخصات یافت نشد"
                        : `نشان دادن ${todos.length} ${resultsText} برای `}
                    <span className="font-bold">&quot;{searchValue}&quot;</span>
                </p>
            ) : null}

            {todos.length > 0 ? <TodoList todos={todos}/> : null}
            <div className="mt-16 flex w-full justify-center">
                {todos.length > 0 ? <Pagination totalPages={totalPages}/> : null}
            </div>

            <AddTodo/>
        </>
    );
}

export default Page;
