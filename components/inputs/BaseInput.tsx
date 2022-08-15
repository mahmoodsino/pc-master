import React, { ChangeEvent, MutableRefObject } from "react";

interface Props {
  type?: "search" | "email" | "password" | "number" | "date";
  value?: string ;
  className: string | undefined;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  title?: string ;
  name?: string;
  register?:any
  disabled?:boolean
  defaultValue?:any

}

const BaseInput = ({
  type,
  value,
  className,
  placeholder,
  onChange,
  title,
  name,
  register,
  disabled,
  defaultValue
}: Props) => {
  return (
    <div className="w-full  ">
      {title && (
        <label
          htmlFor={title}
          className="capitalize w-fit flex  ml-0 text-gray-950 tracking-wide text-sm font-semibold mb-2 "
        >
          {title}
          <span className="text-red-600 text-sm">*</span>
        </label>
      )}
      <input
        id={title}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`${
          className
            ? className
            : " appearance-none block w-full bg-white border-gray-1550 border py-3 px-4 mb-7 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        }`}
        value={value}
        set
        type={type ? type : "text"}
        placeholder={placeholder}
        name={name}
        {...register && {...register(name)}}
      
      />
    </div>
  );
};

export default BaseInput;
