"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { name: "Beranda", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Favorit", href: "/favorit" },
  { name: "Keranjang", href: "/keranjang" },
  { name: "Riwayat", href: "/riwayat" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-50">
      <h1 className="font-bold text-xl">KantinKu</h1>
      <div className="flex gap-4">
        {menus.map((menu) => {
          const isActive = pathname === menu.href;
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={
                isActive
                  ? "font-bold text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-black"
              }
            >
              {menu.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}