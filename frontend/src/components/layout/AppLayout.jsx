import { BarChart3, CreditCard, LayoutDashboard, LogOut, PieChart, Target, WalletCards } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth.jsx";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/expenses", label: "Expenses", icon: CreditCard },
  { to: "/budgets", label: "Budgets", icon: Target },
  { to: "/portfolio", label: "Portfolio", icon: PieChart },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-black/5 bg-white px-4 py-5 lg:block">
        <div className="flex items-center gap-3 px-2">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-mint text-white">
            <WalletCards size={22} />
          </span>
          <div>
            <p className="text-lg font-bold text-ink">FinTrack</p>
            <p className="text-xs font-medium text-slate-500">Finance command center</p>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition ${
                  isActive ? "bg-teal-50 text-mint" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Welcome back</p>
              <h1 className="text-xl font-bold text-ink">{user?.name}</h1>
            </div>
            <button className="focus-ring inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100" onClick={logout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-semibold ${
                    isActive ? "bg-teal-50 text-mint" : "bg-slate-100 text-slate-600"
                  }`
                }
              >
                <link.icon size={17} />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
