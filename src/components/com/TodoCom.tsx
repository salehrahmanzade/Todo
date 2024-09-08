import React from 'react';
import Loading from "@/components/ui/Loading";
import {Checkbox} from "@headlessui/react";
import {CheckIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/16/solid";
import {TodoComponentItem} from "@/types/Todo";


const TodoCom = ({isPendingChangeStatus, todo, setIsEdite, setIsDelete, handleChangeStatus}: TodoComponentItem) => {
    return (
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
    );
};

export default TodoCom;
