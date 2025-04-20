import React, { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, className, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              w-full rounded-md shadow-sm 
              ${icon ? 'pl-10' : 'pl-4'} 
              py-2 pr-4
              border ${error ? 'border-red-500' : 'border-gray-300'} 
              focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
              transition duration-150 ease-in-out
              ${className || ''}
            `}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;