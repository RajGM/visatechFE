
// components/SideNav.tsx
'use client';
import { CalendarCheck2, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";

const icons = [
  { icon: CalendarCheck2, href: "#" },
  { icon: FileText, href: "#" },
  { icon: HelpCircle, href: "#" },
];

export function SideNav() {
  return (
    <aside className="hidden md:flex flex-col items-center pt-4 bg-primary-800 text-white w-14 space-y-8">
      {icons.map(({ icon: Icon, href }, idx) => (
        <Link key={idx} href={href} className="hover:text-primary-200">
          <Icon size={20} />
        </Link>
      ))}
    </aside>
  );
}
