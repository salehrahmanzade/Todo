
import queryString from "query-string";
import TodoList from "@/components/todo/TodoList";

async function Category({ params, searchParams }) {
  const { categorySlug } = params;
  const queries = queryString.stringify(searchParams);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todo/list?categorySlug=${categorySlug}&${queries}`
  );
  const {
    data: { todos },
  } = await res.json();

  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-lg text-secondary-600">{`پستی در این دسته بندی یافت نشد`}</p>
      ) : (
          <TodoList todos={todos}/>
      )}
    </div>
  );
}
export default Category;
