function AuthInput({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="h-12 rounded-xl border border-slate-300 px-4 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />
        </div>
    );
}

export default AuthInput;