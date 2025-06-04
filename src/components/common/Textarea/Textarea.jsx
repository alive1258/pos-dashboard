"use client";

const Textarea = ({
  label,
  text,
  placeholder,
  register,
  errors,
  required = true,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[15px] text-[#b5b7c8] ">
        <span>{label}</span>
        <abbr
          className={`${
            required ? "" : " opacity-0"
          } pl-1 text-lg  text-[#FF4234]`}
        >
          *
        </abbr>
      </label>
      <textarea
        className="input_style min-h-[150px]"
        placeholder={placeholder}
        {...register(text, {
          required: required ? `${label} is required` : false,
        })}
      />
      <div className="h-[10px]">
        {errors?.[text] && (
          <p role="alert" className="text-danger-base text-xs">
            {errors[text]?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
