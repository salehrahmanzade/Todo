import React, {useState} from 'react';
import TodoField from "@/components/ui/TodoField";
import TextArea from "@/components/ui/TextArea";
import {useRouter} from "next/navigation";
import useCategories from "@/hook/useCategory";
import {useEditeTodo} from "@/hook/useAddTodo";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    value: yup
        .string()
        .min(1, "حداقل 1 کاراکتر را وارد کنید")
        .required("عنوان ضروری است"),
    category: yup.string().required("دسته بندی ضروری است"),
}).required();
const EditeTodo = ({onClose, postToEdit = {}}) => {

    const {_id: editId} = postToEdit;
    const isEditSession = Boolean(editId);
    let editValues = {};
    const {
        value,
        desc,
        done,
        category
    } = postToEdit;
    if (isEditSession) {
        editValues = {
            value,
            desc,
            done,
            category
        };
    }

    const router = useRouter();

    const [todo, setTodo] = useState({
        value: "",
        desc: "",
        done: false,
        category: "",
    });

    const [isLoading, setIsloading] = useState(false);
    const {categories} = useCategories();
    const {createTodo, isCreating} = useEditeTodo();


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
        console.log(getData)
        createTodo({id: editId, data: getData}, {
            onSuccess: () => {
                reset();
                onClose();
                router.refresh();
            },
        });
    }

    return (
        <>
            <form className="form p-4"
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
                <div className={"col-span-12"}>
                    <div>
                        <label className="mb-2 block text-secondary-700">
                            {"دسته بندی تسک"}
                        </label>
                        <select
                            name={"category"}
                            className="textField__input bg-secondary-0"
                            id={"category"}
                            {...register("category")}
                        >
                            <option className="" value={"all"}>
                                {"بدون دسته بندی"}
                            </option>
                            {categories?.map((option) => (
                                <option className="" key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={"col-span-12"}>
                    <TextArea
                        label={"توضیحات :  (دلخواه)"}
                        name={"desc"}
                        register={register}
                        required
                        errors={errors}
                    />
                </div>
            </form>
        </>
    );
};

export default EditeTodo;
