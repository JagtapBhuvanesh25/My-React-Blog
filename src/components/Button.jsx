// Button.jsx
function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium
        transition-colors duration-150 ease-in-out shadow-sm
        hover:shadow-md hover:opacity-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className} ${bgColor} ${textColor}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;