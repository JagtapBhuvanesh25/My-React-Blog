import { forwardRef, useId } from "react";

function Select(
  {
    options,
    label,
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className={`w-full ${props.wrapperClass || ""}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-200"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        className={`
          block w-full rounded-lg px-3 py-2
          bg-gray-800 text-gray-200
          border border-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
          transition-colors duration-150
          disabled:opacity-60 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option} className="bg-gray-800 text-gray-200">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);