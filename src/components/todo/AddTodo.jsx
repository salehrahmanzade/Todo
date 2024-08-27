'use client'
import React, {useState, ChangeEvent} from 'react'
import TodoField from "@/components/ui/TodoField";
import {TodoObject, TodoCategoryObject} from "@/models/Todo";
import useCategories from "@/hook/useCategory";
import useAddTodo from "@/hook/useAddTodo";
import Loading from "@/components/ui/Loading";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {revalidatePath} from "next/cache";
import {useRouter} from "next/navigation";

const schema = yup
    .object({
        value: yup
            .string()
            .min(1, "حداقل 1 کاراکتر را وارد کنید")
            .required("عنوان ضروری است"),
    })
    .required();


const AddTodo = () => {
    let editValues = {};

    const router = useRouter();

    const [todo, setTodo] = useState({
        value: "",
        desc: "",
        done: false,
        category: "",
    });

    const [isLoading, setIsloading] = useState(false);
    const {categories} = useCategories();
    const {createTodo, isCreating} = useAddTodo();


    const {
        register,
        formState: {errors},
        setValue,
        handleSubmit,
        reset,
        control,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched",
        defaultValues: editValues,
    });


    const handleOnSubmit = async (getData) => {
        createTodo({
            value: getData.value,
            desc: "",
            done: false,
            category: "",
        }, {
            onSuccess: () => {
                reset();
                router.refresh();
            },
        });
    }


    return (
        <div className="grid grid-cols-12">
            <div
                className={"col-span-12 grid rounded-2xl border border-secondary-100 fixed bottom-0 w-11/12 md:w-1/2 "}>
                <form className="p-4"
                      onSubmit={handleSubmit(handleOnSubmit)}
                >
                    <div className={"col-span-12 flex items-center my-4 rounded-full bg-[#414854]"}>
                        <TodoField
                            label="عنوان"
                            name="value"
                            register={register}
                            required
                            errors={errors}
                            loading={isCreating}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTodo;


