import React, { useEffect, useRef } from "react";

interface Props {
    type: string;
    name?: string;
    value?: string | number;
    className: string;
    autoComplete?: string;
    required?: boolean;
    isFocused?: boolean;
    handleChange?: (
        e: React.ChangeEvent<HTMLInputElement>,
        index?: number
    ) => void;
    handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({
    type = "text",
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    handleKeyDown,
}: Props) {
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused && input.current) {
            input.current.focus();
        }
    }, []);

    return (
        <>
            <input
                type={type}
                name={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </>
    );
}
