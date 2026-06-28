"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  Briefcase,
  FileText,
  LayoutDashboard,
  Layers,
  LogOut,
  Mail,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/about", label: "About / Site", icon: Settings },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/tech-stack", label: "Skills", icon: Layers },
  { href: "/admin/resume", label: "Resume", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card min-h-screen">
      <div className="border-b border-border p-4">
        <Link href="/" className="text-sm font-semibold text-foreground hover:text-accent">
          Portfolio Admin
        </Link>
        {user && <p className="mt-1 truncate text-xs text-muted">{user.email}</p>}
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
              pathname === href || pathname.startsWith(href + "/")
                ? "bg-accent text-accent-foreground"
                : "text-muted hover:bg-background hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => logout()}>
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </div>
    </aside>
  );
}
