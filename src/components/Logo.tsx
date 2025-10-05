import Link from "next/link";
import Image from "next/image";
import LOGO from "../../public/logo.png";

function Logo() {
  return (
    <Link href={"/"} className="logo">
      <Image src={LOGO} alt="Summarizer Logo" width={50} height={50} />
    </Link>
  );
}

export default Logo;
