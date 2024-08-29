const Button = ({
        children,
        onClick,
        variant = "primary",
        className = "",
        ...rest
    }) => {
    const BtnType = {
        primary: "btn--primary",
        secondary: "btn--secondary",
        outline: "btn--outline",
        danger: "btn--danger",
    };
    return (
        <button
            onClick={onClick}
            className={`btn ${BtnType[variant]} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;
