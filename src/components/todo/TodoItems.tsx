'use client'

import React, {useState} from 'react'
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import Modal from "@/components/ui/Modal";
import EditeTodo from "@/components/todo/EditeTodo";
import {useDeleteTodo, useEditeTodo} from "@/hook/useAddTodo";
import {useRouter} from "next/navigation";
import Loading from "@/components/ui/Loading";
import {useWithSound} from "@/hook/useWithSound";
import TodoCom from "@/components/com/TodoCom";
import {TodoObject as TodoType} from "@/types/Todo"

const TodoItems = ({todo = {}}:{todo:TodoType}) => {

    const router = useRouter();
    const [isDelete, setIsDelete] = useState(false);
    const [isEdite, setIsEdite] = useState(false);
    const {isPending, deleteTodo} = useDeleteTodo();
    const {isCreating: isPendingChangeStatus, createTodo: editeStatus} = useEditeTodo();
    const {playSound} = useWithSound('./sound.mp3');

    const handleDelete = async () => {
        deleteTodo(todo?._id, {
            onSuccess: () => {
                setIsDelete(false);
                router.refresh();
            }
        });
        setIsDelete(false);
        router.refresh();
    }
    const handleChangeStatus = async () => {
        let doneStatus = todo.done;
        editeStatus({
            id: todo._id, data: {
                ...todo,
                done: !todo.done
            }
        }, {
            onSuccess: () => {
                if (!doneStatus) playSound();
                router.refresh();
            },
        });
    }
    return (
        <div
            className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4 border border-secondary-100 p-2 rounded-lg shadow-md shadow-blue-600/70"
        >
            <TodoCom
                todo={todo}
                isPendingChangeStatus={isPendingChangeStatus}
                setIsEdite={setIsEdite}
                setIsDelete={setIsDelete}
                handleChangeStatus={handleChangeStatus}
            />
            <Modal
                title={"حذف تسک"}
                open={isDelete}
                onClose={() => setIsDelete(false)}
                description={todo.value}
            >
                {isPending ? <Loading/> : (
                    <ConfirmDelete
                        onConfirm={async () => await handleDelete()}
                        resourceName={todo.value} onClose={() => setIsDelete(false)}/>
                )}
            </Modal>
            <Modal
                title={"ویرایش تسک"}
                open={isEdite}
                onClose={() => setIsEdite(false)}
                description={`  ویرایش تسک :   ${todo.value}`}
            >
                <EditeTodo postToEdit={todo}
                           onClose={() => setIsEdite(false)}
                />
            </Modal>
        </div>
    );
};

export default TodoItems;
