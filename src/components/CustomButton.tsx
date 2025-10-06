export type ButtonTypes = "primary" | "secondary" | "warning" | "success";

type CustomButtonProps =
  | {
      title: string;
      type: ButtonTypes;
      disabled: true;
      disabledText: string;
      onClick?: () => void;
    }
  | {
      title: string;
      type: ButtonTypes;
      disabled?: false;
      disabledText?: string;
      onClick?: () => void;
    };

function CustomButton({
  title,
  onClick,
  type,
  disabled,
  disabledText,
}: CustomButtonProps) {
  const disabledStyle = disabled ? "cursor-not-allowed" : "";
  const baseStyle =
    "cursor-pointer px-4 py-3 border-1 font-semibold rounded-sm w-full h-full font-[1.1rem]";

  let buttonStyle;
  switch (type) {
    case "primary":
      buttonStyle = `
      bg-(--primary-light) border-(--primary) 
      text-(--text-inverted) 
      hover:bg-(--primary) hover:border-(--primary-light)`;
      break;

    case "secondary":
      buttonStyle = `
      bg-(--highlight) border-(--border)
      text-(--text-inverted)
      hover:bg-(--highlight-dark) hover:border-(--highlight)`;
      break;
    case "warning":
      buttonStyle = `
      bg-(--accent-red-light) border-(--accent-red)
      text-(--text-inverted) 
      hover:bg-(--accent-red) hover:border-(--accent-red-light)`;
      break;
    case "success":
      buttonStyle = `
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
      className={`${baseStyle} ${buttonStyle} ${disabledStyle}`}
    >
      {disabled ? disabledText : title}
    </button>
  );
}

export default CustomButton;
