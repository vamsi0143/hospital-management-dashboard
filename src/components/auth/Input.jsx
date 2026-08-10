// function Input({
//     label,
//     name,
//     type = "text",
//     placeholder,
//     value,
//     onChange,
//     onBlur,
//     error,
//     required = false,
// }) {
//     return (
//         <div className="space-y-2">
//             <label className="block text-sm font-semibold text-slate-700">
//                 {label}
//                 {required && (
//                     <span className="ml-1 text-red-500">*</span>
//                 )}
//             </label>

//             <input
//                 name={name}
//                 type={type}
//                 placeholder={placeholder}
//                 value={value}
//                 onChange={onChange}
//                 onBlur={onBlur}
//                 className={`
//                     h-12
//                     w-full
//                     rounded-xl
//                     border
//                     px-4
//                     outline-none
//                     transition-all
//                     duration-300
//                     ${error
//                         ? "border-red-500 focus:ring-red-200"
//                         : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
//                     }
//                 `}
//             />

//             {error && (
//                 <p className="text-sm text-red-500">
//                     {error}
//                 </p>
//             )}
//         </div>
//     );
// }

// export default Input;


function Input({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    required = false,
    disabled = false,
}) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-slate-700"
            >
                {label}

                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                className={`
          h-12
          w-full
          rounded-xl
          border
          px-4
          outline-none
          transition-all
          duration-300
          placeholder:text-slate-400
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          ${error
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    }
        `}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;

