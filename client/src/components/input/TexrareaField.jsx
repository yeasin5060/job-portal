import React from 'react'
import { AlertCircle } from "lucide-react";

const TexrareaField = ({
    label,
    id,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    helperText,
    rows=6,
    ...props
    }) => {
    return (
        <div className='space-y-2'>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                rows={rows}
                className={`w-full px-3 py-2.5 border rounded-lg text-base transition-colors duration-200 resize-y disabled:bg-gray-50 
                disabled:text-gray-500 ${error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}  focus:outline-none
                focus:ring-2
                focus:ring-opacity-20`}
                style={{minHeight : "150px"}}
                {...props}
            />
            {error && (
                <div className="flex items-center space-x-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
            {
                helperText && !error && (
                    <p className="text-sm text-gray-500">{helperText}</p>
                )
            }

        </div>
    )
    }

export default TexrareaField