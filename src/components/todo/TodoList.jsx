import TodoItems from "@/components/todo/TodoItems";

const TodoList = ({todos}) => {
    return (
        <div className="grid grid-cols-12 gap-6">
            {todos?.map((todo) => <TodoItems key={todo._id} todo={todo}/>)}
        </div>
    )
};

export default TodoList;
