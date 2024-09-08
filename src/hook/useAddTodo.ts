import {createTodoApi, getAllTodoApi,editTodoApi,deleteTodoApi} from "@/httpServices/todoService";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";

export default function useAddTodo() {
    const queryClient = useQueryClient();

    const {isPending: isCreating, mutate: createTodo} = useMutation({
        mutationFn: createTodoApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["Todos"],
            });
        },
        onError: (err) => toast.error(err?.response?.data?.message),
    });
    return {isCreating, createTodo};
}

export function useEditeTodo() {

    const {isPending: isCreating, mutate: createTodo} = useMutation({
        mutationFn: editTodoApi,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (err) => toast.error(err?.response?.data?.message),
    });
    return {isCreating, createTodo};
}

export function useDeleteTodo() {

    const {isPending: isPending, mutate: deleteTodo} = useMutation({
        mutationFn: deleteTodoApi,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (err) => toast.error(err?.response?.data?.message),
    });
    return {isPending, deleteTodo};
}