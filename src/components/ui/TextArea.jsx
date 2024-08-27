function TextArea({
                      label,
                      name,
                      value,
                      dir = "rtl",
                      onChange,
                      isRequired = false,
                      register,
                      validationSchema = {},
                      ...rest
                  }) {
    return (
        <div className="textField">
            <label htmlFor={name} className="text-secondary-600 text-sm">
                {/*{label}*/}
                {isRequired && <span className="text-error">*</span>}
            </label>
            <textarea
                placeholder={label}
                name={name}
                id={name}
                dir={dir}
                className={`textField__input mt-2 min-h-[150px] leading-8 ${
                    dir === "ltr" ? "text-left" : "text-right"
                }`}
                {...register(name, validationSchema)}
                {...rest}
                value={value}
                onChange={onChange}
            ></textarea>
        </div>
    );
}

export default TextArea;
