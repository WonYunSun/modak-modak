export interface LabelProps {
  htmlFor: string;
  label: string;
  required?: boolean;
  description?: string;
  className?: string;
}

const Label = ({ htmlFor, label, required, description, className }: LabelProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex">
        <label className="font-semibold text-xl leading-[140%]" htmlFor={htmlFor}>
          {label}
        </label>
        {required && <p className="text-[#FF3B30] ml-1">*</p>}
      </div>
      {description && <p className="text-gray-500 font-normal text-base leading-[140%]">{description}</p>}
    </div>
  );
};

export default Label;
