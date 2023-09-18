import Link from "next/link";
"use client";
import Image from "next/image";
import ButtonNav from "./Button-nav";

// import CustomButton from "./CustomButton";

const NavBar = () => (
  <div className="wrapper flex items-center justify-between">
    <a href="#" className="Header-Logo">
      <div>
        <Image
          src="/assets/Vector.svg"
          alt="temp-logo"
          width={57}
          height={45}
        />
      </div>
    </a>
    <ul className="Navigation">
      {nav.map((nv) => (
        <li key={nv.name}> 
             <a href={nv.href}>{nv.name}</a>
        </li>
      ))}
    </ul>
    <ButtonNav />
  </div>
);
const nav = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Team",
    href: "/team",
  },
];
export default NavBar;
