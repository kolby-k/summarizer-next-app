import Link from "next/link";

export type Linkvariants =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "link";

type CustomLinkProps = {
  path: string;
  label: string;
  variant: Linkvariants;
};

function CustomLink({ path, label, variant }: CustomLinkProps) {
  const baseStyle =
    variant === "link"
      ? "cursor-pointer px-4 py-3 font-semibold w-full h-full font-[1.1rem] z-100"
      : "cursor-pointer px-4 py-3 border-1 font-semibold rounded-sm w-full h-full font-[1.1rem] z-100";

  let linkStyle;
  switch (variant) {
    case "primary":
      linkStyle = `
      bg-(--primary-light) border-(--primary) 
      text-(--text-inverted) 
      hover:bg-(--primary) hover:border-(--primary-light)`;
      break;

    case "secondary":
      linkStyle = `
      bg-(--highlight) border-(--border)
      text-(--text-inverted)
      hover:bg-(--highlight-dark) hover:border-(--highlight)`;
      break;
    case "warning":
      linkStyle = `
      bg-(--accent-red-light) border-(--accent-red)
      text-(--text-inverted) 
      hover:bg-(--accent-red) hover:border-(--accent-red-light)`;
      break;
    case "success":
      linkStyle = `
      bg-(--accent-green-light) border-(--accent-green) 
      text-(--text-inverted) 
      hover:bg-(--accent-green) hover:border-(--accent-green-light)`;
      break;

    case "link":
      linkStyle = `
      self-center 
      text-(--accent-orange-light) text-lg font-bold
      hover:text-(--accent-orange)`;
      break;
    default:
      break;
  }

  return (
    <Link href={path} title={label} className={`${baseStyle} ${linkStyle}`}>
      {label}
    </Link>
  );
}

export default CustomLink;
