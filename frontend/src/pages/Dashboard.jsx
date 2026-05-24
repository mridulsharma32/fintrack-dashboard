import { AreaChart, Area, BarChart, Bar, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PiggyBank, Target, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

import Card from "../components/ui/Card.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import { summaryFallback } from "../data/demoData.js";
import { api } from "../services/api.js";

const COLORS = ["#0f766e", "#e85d4f", "#f4a261", "#2f5d62", "#7c3f58", "#52796f"];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value));

export default function Dashboard() {
  const [summary, setSummary] = useState(summaryFallback);

  useEffect(() => {
    api.get("/api/analytics/summary").then(({ data }) => setSummary(data)).catch(() => setSummary(summaryFallback));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Wallet} label="Monthly expenses" value={formatCurrency(summary.monthly_expenses)} tone="coral" />
        <StatCard icon={Target} label="Budget remaining" value={formatCurrency(summary.budget_remaining)} tone="mint" />
        <StatCard icon={TrendingUp} label="Portfolio value" value={formatCurrency(summary.portfolio_value)} tone="amber" />
        <StatCard icon={PiggyBank} label="Savings rate" value={`${summary.savings_rate}%`} tone="ink" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-ink">Monthly spending</h2>
            <p className="text-sm text-slate-500">Current year trend</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={summary.monthly_spending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Area type="monotone" dataKey="amount" stroke="#0f766e" fill="#ccfbf1" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-ink">Category mix</h2>
            <p className="text-sm text-slate-500">Expense allocation</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={summary.category_breakdown} dataKey="amount" nameKey="category" innerRadius={70} outerRadius={110}>
                  {summary.category_breakdown.map((entry, index) => (
                    <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-5">
          <h2 className="text-lg font-bold text-ink">Insights</h2>
          <div className="mt-4 space-y-3">
            {summary.insights.map((insight) => (
              <p key={insight} className="rounded-md bg-slate-50 p-3 text-sm font-medium text-slate-700">
                {insight}
              </p>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-lg font-bold text-ink">Category totals</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.category_breakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="amount" fill="#e85d4f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
