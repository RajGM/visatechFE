// components/TopNav.tsx
"use client";
import { ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { SignInButton } from "@components/signinButton";
import { SignOutButton } from "@components/signoutButton";

const links = [
  { label: "Passport", href: "#" },
  { label: "Visa", href: "#" },
  { label: "Sicher Reisen", href: "#" },
  { label: "Further administrative services", href: "#" },
];

export function TopNav() {
  const { user } = useContext(UserContext);
  console.log("TopNav user:", user);
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="flex items-center gap-1 hover:text-primary-600"
            >
              {l.label}
              <ChevronDown size={14} className="opacity-70" />
            </a>
          ))}
        </nav>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-primary-600">
            English
          </a>
          <a href="#" className="hover:text-primary-600">
            Contact
          </a>
          <a href="#" className="hover:text-primary-600">
            Access
          </a>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <SignOutButton className="text-sm text-primary-600 hover:underline" />
            </>
          ) : (
            <SignInButton className="text-sm text-primary-600 hover:underline" />
          )}
        </div>
      </div>
    </header>
  );
}
