interface ButtonProps {
  label: string;
  className: string;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ label, className, disabled, type, children, onClick }: ButtonProps) => {
  return (
    <button disabled={disabled} type={type} className={`${className} ${disabled && 'disabled-btn'}`} onClick={onClick}>
      {children}
      {label}
    </button>
  );
};

export default Button;
