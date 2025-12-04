import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-sm font-medium text-gray-200"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        ref={ref}
        className={`
          w-full px-3 py-2 rounded-lg
          bg-gray-800 text-gray-200 
          border border-gray-700
          outline-none 
          focus:ring-2 focus:ring-blue-400 focus:border-blue-400
          transition-colors duration-150
          placeholder-gray-400
          disabled:opacity-60 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
    </div>
  );
});

export default Input;