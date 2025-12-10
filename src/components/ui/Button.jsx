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
    primary: 'text-white bg-[#536a37] hover:bg-[#3e5229] shadow-lg hover:shadow-xl',
    secondary: 'text-white border-2 border-white border-opacity-30 hover:text-gray-900 hover:bg-white hover:bg-opacity-10',
    gradient: 'text-white bg-gradient-to-r from-[#628141] to-[#536a37] hover:from-[#536a37] hover:to-[#3e5229] shadow-xl hover:shadow-2xl hover:scale-[1.02]',
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