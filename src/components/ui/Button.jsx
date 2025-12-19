function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button'
}) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 ease-in-out';
  
  const variants = {
    primary: 'text-white bg-[#628141] hover:bg-[#536a37] hover:bg-opacity-80 shadow-xl hover:shadow-2xl transition-all',
    secondary: 'text-white border-2 border-white border-opacity-30 hover:text-gray-900 hover:bg-white hover:bg-opacity-10',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;