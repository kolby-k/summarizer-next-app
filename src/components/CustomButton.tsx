export type ButtonTypes = React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
type ButtonVariants = "primary" | "secondary" | "warning" | "success";

type CustomButtonProps =
  | {
      title: string;
      disabled: true;
      variant: ButtonVariants;
      disabledText: string;
      onClick?: () => void;
      type?: ButtonTypes;
      styles?: string;
    }
  | {
      title: string;
      variant: ButtonVariants;
      disabled?: false;
      disabledText?: string;
      onClick?: () => void;
      type?: ButtonTypes;
      styles?: string;
    };

function CustomButton({
  title,
  variant,
  disabled,
  disabledText,
  onClick,
  type = "button",
  styles,
}: CustomButtonProps) {
  const disabledStyle = disabled ? "cursor-not-allowed" : "";
  const baseStyle =
    "cursor-pointer px-4 py-3 border-1 font-semibold rounded-sm w-full h-full font-[1.1rem] max-h-[60px]";

  let buttonVariant;
  switch (variant) {
    case "primary":
      buttonVariant = `
      bg-(--primary-light) border-(--primary) 
      text-(--text-inverted) 
      hover:bg-(--primary) hover:border-(--primary-light)`;
      break;

    case "secondary":
      buttonVariant = `
      bg-(--highlight) border-(--border)
      text-(--text-inverted)
      hover:bg-(--highlight-dark) hover:border-(--highlight)`;
      break;
    case "warning":
      buttonVariant = `
      bg-(--accent-red-light) border-(--accent-red)
      text-(--text-inverted) 
      hover:bg-(--accent-red) hover:border-(--accent-red-light)`;
      break;
    case "success":
      buttonVariant = `
      bg-(--accent-green-light) border-(--accent-green) 
      text-(--text-inverted) 
      hover:bg-(--accent-green) hover:border-(--accent-green-light)`;
      break;

    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`${baseStyle} ${buttonVariant} ${disabledStyle} ${styles}`}
      type={type}
    >
      {disabled ? disabledText : title}
    </button>
  );
}

export default CustomButton;
