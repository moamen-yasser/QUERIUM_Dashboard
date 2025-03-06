import React, { useState } from "react";
import { Input } from "@mantine/core";

const SearchInput = ({
    placeholder = "Search...",
    value,
    onChange,
    onClear,
    className,
}) => {
    return (
        <Input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rightSectionPointerEvents="all"
            className={`flex items-center justify-center relative ${className}`}
            classNames={{
                input: `py-2 px-10 rounded-2xl w-full border border-gray-200 placeholder:text-xs outline-none focus:ring-0 `,
            }}
            rightSection={
                <i
                className="bi bi-x-lg absolute right-14 top-2 text-base font-bold font-paragarphFont cursor-pointer text-main -mr-10"
                aria-label="Clear input"
                style={{
                    display: value ? undefined : "none",
                }}
                onClick={onClear}
                ></i>
            }
            leftSection={
                <i className="bi bi-search absolute left-3 top-2 text-base font-paragarphFont text-submain font-bold text-main"></i>
            }
        />
    );
};

export default SearchInput;