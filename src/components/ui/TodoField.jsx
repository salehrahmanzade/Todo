import React from 'react';
import Loading from "@/components/ui/Loading";


const TodoField = ({
                       type = "text",
                       label,
                       name,
                       value,
                       dir = "rtl",
                       onChange,
                       isRequired = false,
                       className,
                       loading,
                       register,
                       errors,
                       validationSchema = {},
                       ...rest
                   }) => {
    const errorMessages = errors?.[name];
    const hasError = !!(errors && errorMessages);
    return (
        <div className="relative w-full">
            {errors && errors[name] && (
                <span className="text-red-600 absolute -top-2 right-4 text-xs mt-2">
          {errors[name]?.message}
        </span>
            )}
            <input
                type={type}
                name={name}
                id={name}
                dir={dir}
                placeholder={"افزودن تسک"}
                className={`bg-transparent w-9/12 md:w-4/5 border-0 outline-none flex-1 h-14 pr-6 pl-2 placeholder:text-white/60 text-white  ${
                    dir === "ltr" ? "text-left" : "text-right"
                } ${className}`}
                autoComplete="off"
                {...register(name, validationSchema)}
                {...rest}
            />
            <button type={"submit"}
                    className={"border-none absolute rounded-full bg-primary-800 md:w-1/5 w-3/12 h-14 text-white text-lg font-medium cursor-pointer"}
            >
                {loading ? (
                    <Loading/>
                ) : (
                    <span>افزودن</span>
                )}
            </button>
        </div>
    );
};

export default TodoField;