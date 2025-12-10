import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  showPasswordToggle = false,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-white text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-gray-700 placeholder-gray-400 shadow-md focus:outline-none focus:border-[#7fa654] focus:border-opacity-60 transition-all backdrop-blur-sm ${showPasswordToggle ? 'pr-12' : ''} ${className}`}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}