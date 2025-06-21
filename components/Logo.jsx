// components/Logo.tsx
'use client';
import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      {/* Placeholder eagle logo */}
      <Image
        src="/placeholder-eagle.svg" // replace with real asset
        alt="Federal Foreign Office logo"
        width={40}
        height={40}
        priority
      />
      <span className="font-semibold tracking-tight text-xl">
        Federal Foreign Office
      </span>
    </div>
  );
}