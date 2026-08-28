"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  History,
  LogOut,
  ExternalLink,
  UserCheck,
  Loader2,
  Shield,
} from "lucide-react";
import { UserButton, Show } from "@clerk/nextjs";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setAdmin(data.user);
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080d1a] flex items-center justify-center text-slate-400 gap-2.5">
        <Loader2 className="w-5 h-5 animate-spin text-red-500" />
        <span className="text-xs font-medium">Verifying admin session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-slate-100 selection:bg-red-600 selection:text-white">
      {/* Top Operations Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080d1a]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm shrink-0">
                <Image
                  src="/logo.png"
                  alt="Nogadex Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-none">
                  nogadex<span className="text-red-500">.ops</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  WAEC Operations Desk
                </div>
              </div>
            </Link>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1">
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  pathname === "/admin"
                    ? "bg-red-600/15 text-red-400 border border-red-500/25"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Requests Queue
              </Link>

              <Link
                href="/admin/audit-logs"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  pathname === "/admin/audit-logs"
                    ? "bg-red-600/15 text-red-400 border border-red-500/25"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <History className="w-3.5 h-3.5" />
                Audit Logs
              </Link>
            </nav>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
            >
              Public Site <ExternalLink className="w-3 h-3" />
            </Link>

            {admin && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-medium">{admin.name}</span>
              </div>
            )}

            <Show when="signed-in">
              <UserButton />
            </Show>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
