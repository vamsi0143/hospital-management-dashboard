function Button({
    children,
    type = "button",
    loading = false,
    disabled = false,
    className = "",
    onClick,
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`
        flex
        h-12
        w-full
        items-center
        justify-center
        rounded-xl
        bg-blue-600
        px-5
        font-semibold
        text-white
        transition-all
        duration-300
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${className}
      `}
        >
            {loading ? (
                <>
                    <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Please wait...
                </>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;