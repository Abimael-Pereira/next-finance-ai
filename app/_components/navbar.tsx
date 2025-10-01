"use client";

import { UserButton } from "@clerk/nextjs";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname === "/login") {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/transactions", label: "Transações" },
    { href: "/subscription", label: "Assinatura" },
  ];

  return (
    <nav className="border-b border-solid px-4 py-4 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-10">
          <Image
            src="/logo.svg"
            width={173}
            height={39}
            alt="Finance Ai"
            className="h-8 w-auto md:h-10"
          />

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <UserButton showName />
          </div>
          <div className="block sm:hidden">
            <UserButton />
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mt-4 border-t pt-4 md:hidden">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 py-1 ${
                  pathname === link.href
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
