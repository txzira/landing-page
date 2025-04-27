import React from "react";

const FormElement = ({
  className,
  label,
  value,
  placeholder,
  required,
  error,
  onChange,
}: {
  className?: string;
  label: string;
  value: string;
  placeholder?: string;
  required: boolean;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className={`${className}`}>
      <div className={` relative mt-5 `}>
        <input
          className={`${
            value ? "" : ""
          } h-10 outline-0 p-2.5  peer  bg-white rounded-md w-full`}
          id={label}
          required={required}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <label
          className={`top-1/5 h-12 left-0 pl-2.5  transition duration-300 ease-in absolute peer-focus:text-xs peer-focus:translate-x-1 peer-focus:-translate-y-[26px]  peer-focus:text-white  ${
            value ? "translate-x-1 -translate-y-[26px] text-white text-xs " : ""
          } `}
          htmlFor={label}>
          {label}
        </label>
      </div>
      {error ? <p className="text-red-600">{error}</p> : null}
    </div>
  );
};

export default FormElement;
