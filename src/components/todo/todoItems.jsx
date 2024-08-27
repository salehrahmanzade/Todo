'use client'

import React, {useState} from 'react'
import {Checkbox} from '@headlessui/react'
import {CheckIcon, TrashIcon, PencilSquareIcon} from '@heroicons/react/16/solid'
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import Modal from "@/components/ui/Modal";
import EditeTodo from "@/components/todo/editeTodo";
import {useDeleteTodo, useEditeTodo} from "@/hook/useAddTodo";
import {useRouter} from "next/navigation";
import Loading from "@/components/ui/Loading";
import {useWithSound} from "@/hook/useWithSound";


const TodoItems = ({todo = {}}) => {
    const router = useRouter();
    const [enabled, setEnabled] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isEdite, setIsEdite] = useState(false);
    const {isPending, deleteTodo} = useDeleteTodo();
    const {isCreating: isPendingChangeStatus, createTodo: editeStatus} = useEditeTodo();
    const {pauseSound, playSound} = useWithSound('./sound.mp3');

    const handleDelete = async () => {
        deleteTodo(todo?._id);
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
            <div className={"flex flex-row align-middle justify-start items-center text-right p-0.5 my-1"}>
                {isPendingChangeStatus ? (
                        <Loading/>
                    ) :
                    <Checkbox
                        checked={todo.done}
                        onChange={() => handleChangeStatus()}
                        className="group size-6 rounded-full bg-white/15 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-primary-900"
                    >
                        <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block"/>
                    </Checkbox>
                }
                <p
                    className={todo.done ? "text-white/85 line-through mr-2 ml-auto" : "text-white mr-2 ml-auto"}
                >{todo.value}</p>
                <PencilSquareIcon
                    onClick={() => setIsEdite(true)}
                    className={"size-6 fill-emerald-900 hover:fill-emerald-900/75 mx-1.5 cursor-pointer  hover:transition-all transition delay-100 duration-400 ease-in-out"}/>
                <TrashIcon
                    onClick={() => setIsDelete(true)}
                    className={"size-6 fill-red-800 cursor-pointer hover:fill-red-800/75  hover:transition-all transition delay-100 duration-400 ease-in-out"}/>
            </div>
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
