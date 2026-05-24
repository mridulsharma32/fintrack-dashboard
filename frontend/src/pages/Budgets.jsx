import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import { demoBudgets } from "../data/demoData.js";
import { api } from "../services/api.js";

const categories = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Education", "Other"];
const formatCurrency = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value));

export default function Budgets() {
  const [budgets, setBudgets] = useState(demoBudgets);
  const [form, setForm] = useState({ category: "Food", limit_amount: "" });

  async function loadBudgets() {
    try {
      const { data } = await api.get("/api/budgets");
      setBudgets(data);
    } catch {
      setBudgets(demoBudgets);
    }
  }

  useEffect(() => {
    loadBudgets();
  }, []);

  async function saveBudget(event) {
    event.preventDefault();
    try {
      await api.post("/api/budgets", { ...form, limit_amount: Number(form.limit_amount) });
      setForm({ category: "Food", limit_amount: "" });
      await loadBudgets();
      toast.success("Budget saved");
    } catch {
      toast.error("Start the backend to save budgets");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
      <Card className="p-5">
        <h2 className="text-lg font-bold text-ink">Set category budget</h2>
        <form className="mt-4 space-y-4" onSubmit={saveBudget}>
          <select className="focus-ring h-11 w-full rounded-md border border-black/10 px-3" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <input className="focus-ring h-11 w-full rounded-md border border-black/10 px-3" placeholder="Monthly limit" type="number" min="1" value={form.limit_amount} onChange={(event) => setForm({ ...form, limit_amount: event.target.value })} required />
          <Button className="w-full" type="submit">
            <Target size={18} />
            Save budget
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        {budgets.map((budget) => (
          <Card key={budget.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-ink">{budget.category}</h3>
                <p className="text-sm text-slate-500">
                  {formatCurrency(budget.spent_amount)} spent of {formatCurrency(budget.limit_amount)}
                </p>
              </div>
              <p className="text-sm font-bold text-mint">{Math.round(budget.usage_percent)}%</p>
            </div>
            <div className="mt-4 h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-mint" style={{ width: `${Math.min(Number(budget.usage_percent), 100)}%` }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
