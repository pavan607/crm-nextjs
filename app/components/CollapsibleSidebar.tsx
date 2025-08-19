'use client';

import Link from "next/link";

interface SubMenuItem {
  href: string;
  label: string;
}

interface MenuItem {
  label: string;
  href?: string;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { href: "/", label: "Home" },
  {
    label: "Master",
    subItems: [
      { href: "/customer/list", label: "Customer" },
      { href: "/employee/list", label: "Employee" },
      { href: "/product/list", label: "Product" },
      
    ],
  },
  {
    label: "Transactions",
    subItems: [
      { href: "/enquiry/list", label: "Enquiry" },
      { href: "/fsn/list", label: "FSN" },
      { href: "/send-email", label: "Email" },
      { href: "/payments", label: "Payments" },
    ],
  },
  {
    label: "Reports",
    subItems: [
      { href: "/sales-reports", label: "Product Sales" },
      { href: "/sales-report", label: "Product Value" },
      { href: "/reports/employee", label: "Employee Reports" },
      { href: "/reports/financial", label: "Financial Reports" },
    ],
  },
];

export default function CollapsibleSidebar() {
  return (
    <aside className="bg-gray-100 dark:bg-gray-800 p-6 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <div className="relative group" key={item.label}>
            {item.href ? (
              <Link href={item.href}>
                <span className="flex items-center justify-between px-3 py-2 rounded font-medium transition-colors text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                  {item.label}
                </span>
              </Link>
            ) : (
              <div className="flex items-center justify-between px-3 py-2 rounded font-medium transition-colors text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                <span>{item.label}</span>
                <span className="text-xs">▶</span>
              </div>
            )}

            {/* Hover-based submenu */}
            {item.subItems && (
              <div className="hidden group-hover:block ml-4 mt-1">
                {item.subItems.map((subItem) => (
                  <Link href={subItem.href} key={subItem.href}>
                    <span className="block px-3 py-2 rounded text-sm font-normal transition-colors text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 cursor-pointer">
                      {subItem.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
