'use client'
import React, {useState, ChangeEvent} from 'react'
import TodoField from "@/components/ui/TodoField";
import {TodoObject, TodoCategoryObject} from "@/models/Todo";
import useCategories from "@/hook/useCategory";
import useAddTodo from "@/hook/useAddTodo";
import Loading from "@/components/ui/Loading";


const AddTodo: React.FC = () => {

    const [todo, setTodo] = useState<TodoObject>({
        value: "",
        desc: "",
        done: false,
        category: "",
    });
    const [isLoading, setIsloading] = useState<boolean>(false);
    const {categories}: { categories: [TodoCategoryObject] } = useCategories();
    const {isCreating, createTodo}: {} = useAddTodo();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // await createTodo(todo);
        console.log(todo)
    }

    const onChangeState = (e) => {
        setTodo(priveState => ({
            ...priveState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="grid grid-cols-12">
            <div
                className={"col-span-12 grid rounded-2xl border border-secondary-100 fixed bottom-0 w-11/12 md:w-1/2 "}>
                <form className="p-4"
                      onSubmit={(e) => handleOnSubmit(e)}
                >
                    <div className={"col-span-12 flex items-center my-4 rounded-full bg-[#414854]"}>
                        <div className="relative w-full">
                            <input
                                type={"text"}
                                name={"value"}
                                dir={"rtk"}
                                placeholder={"افزودن تسک"}
                                className={`bg-transparent w-9/12 md:w-4/5 border-0 outline-none flex-1 h-14 pr-6 pl-2 placeholder:text-white/60 text-white 
                                   text-right `}
                                value={todo.value}
                                onChange={(e) => onChangeState(e)}
                            />
                            <button type={"submit"}
                                    className={"border-none absolute rounded-full bg-primary-800 md:w-1/5 w-3/12 h-14 text-white text-lg font-medium cursor-pointer"}
                            >
                                {isLoading ? (
                                    <Loading/>
                                ) : (
                                    <span>افزودن</span>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTodo;

// <div className={"col-span-12"}>
//     <div>
//         <label className="mb-2 block text-secondary-700">
//             {"دسته بندی تسک"}
//         </label>
//         <select
//             onChange={onChangeState}
//             name={"category"}
//             className="textField__input">
//             <option className="bg-red-300" value={"all"}>
//                 {"بدون دسته بندی"}
//             </option>
//             {categories?.map((option) => (
//                 <option className="bg-red-300" key={option.value} value={option.value}>
//                     {option.label}
//                 </option>
//             ))}
//         </select>
//     </div>
// </div>
// <div className={"col-span-12"}>
//     <TextArea
//         value={todo.desc}
//         onChange={onChangeState}
//         label={"توضیحات :  (دلخواه)"}
//         name={"desc"}
//     />
// </div>
