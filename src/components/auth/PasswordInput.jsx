// import { useState } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";

// function PasswordInput({
//     label,
//     name,
//     placeholder,
//     value,
//     onChange,
//     onBlur,
//     error,
//     required = false,
// }) {
//     const [showPassword, setShowPassword] = useState(false);

//     return (
//         <div className="space-y-2">
//             <label className="block text-sm font-semibold text-slate-700">
//                 {label}
//                 {required && (
//                     <span className="ml-1 text-red-500">*</span>
//                 )}
//             </label>

//             <div className="relative">
//                 <input
//                     name={name}
//                     type={showPassword ? "text" : "password"}
//                     placeholder={placeholder}
//                     value={value}
//                     onChange={onChange}
//                     onBlur={onBlur}
//                     className={`
//             h-12
//             w-full
//             rounded-xl
//             border
//             px-4
//             pr-12
//             outline-none
//             transition-all
//             duration-300
//             ${error
//                             ? "border-red-500 focus:ring-red-200"
//                             : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
//                         }
//           `}
//                 />

//                 <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
//                 >
//                     {showPassword ? (
//                         <FiEyeOff size={20} />
//                     ) : (
//                         <FiEye size={20} />
//                     )}
//                 </button>
//             </div>

//             {error && (
//                 <p className="mt-1 text-sm text-red-500">
//                     {error}
//                 </p>
//             )}
//         </div>
//     );
// }

// export default PasswordInput;


import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function PasswordInput({
    label,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    required = false,
    disabled = false,
}) {
    const [showPassword, setShowPassword] = useState(false);

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

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
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
            pr-12
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

                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <FiEyeOff size={20} />
                    ) : (
                        <FiEye size={20} />
                    )}
                </button>
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default PasswordInput;

