import Link from "next/link";
import { Plus } from "lucide-react";

export function AdminFab() {
  return (
    <Link
      href="/admin/login"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:opacity-90 transition-opacity"
      aria-label="Admin login"
      title="Admin"
    >
      <Plus className="h-6 w-6" />
    </Link>
  );
}
