import Table from "@/components/ui/Table";
import Empty from "@/components/ui/Empty";
import { getAllTodoApi } from "@/services/todoService";
import PostRow from "./PostRow";

async function PostsTable({ query }) {
  const { todos } = await getAllTodoApi(query);

  if (!todos.length) return <Empty resourceName="پستی" />;
  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>عنوان</th>
        <th>دسته بندی</th>
        <th>ایجاد کننده</th>
        <th>تاریخ ایجاد</th>
        <th>نوع</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {todos.map((post, index) => (
          <PostRow key={post._id} post={post} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}
export default PostsTable;
