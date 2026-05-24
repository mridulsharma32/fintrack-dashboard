import { Plus, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import { demoExpenses } from "../data/demoData.js";
import { api } from "../services/api.js";

const categories = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Education", "Other"];
const formatCurrency = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(value));

export default function Expenses() {
  const [expenses, setExpenses] = useState(demoExpenses);
  const [form, setForm] = useState({ description: "", amount: "", category: "Food", date: new Date().toISOString().slice(0, 10) });

  async function loadExpenses() {
    try {
      const { data } = await api.get("/api/expenses");
      setExpenses(data);
    } catch {
      setExpenses(demoExpenses);
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function createExpense(event) {
    event.preventDefault();
    try {
      await api.post("/api/expenses", { ...form, amount: Number(form.amount) });
      setForm({ description: "", amount: "", category: "Food", date: new Date().toISOString().slice(0, 10) });
      await loadExpenses();
      toast.success("Expense added");
    } catch {
      toast.error("Start the backend to save expenses");
    }
  }

  async function importCsv(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const payload = new FormData();
    payload.append("file", file);
    try {
      await api.post("/api/imports/csv", payload);
      await loadExpenses();
      toast.success("CSV imported");
    } catch {
      toast.error("CSV import needs the backend running");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card className="p-5">
        <h2 className="text-lg font-bold text-ink">Add expense</h2>
        <form className="mt-4 space-y-4" onSubmit={createExpense}>
          <input className="focus-ring h-11 w-full rounded-md border border-black/10 px-3" placeholder="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
          <input className="focus-ring h-11 w-full rounded-md border border-black/10 px-3" placeholder="Amount" type="number" min="1" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} required />
          <select className="focus-ring h-11 w-full rounded-md border border-black/10 px-3" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <input className="focus-ring h-11 w-full rounded-md border border-black/10 px-3" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required />
          <Button className="w-full" type="submit">
            <Plus size={18} />
            Add expense
          </Button>
        </form>
        <label className="focus-ring mt-4 flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-mint bg-teal-50 px-4 text-sm font-semibold text-mint">
          <Upload size={18} />
          Import CSV
          <input className="hidden" type="file" accept=".csv" onChange={importCsv} />
        </label>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-black/5 p-5">
          <h2 className="text-lg font-bold text-ink">Recent expenses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-5 py-4 font-semibold text-ink">{expense.description}</td>
                  <td className="px-5 py-4 text-slate-600">{expense.category}</td>
                  <td className="px-5 py-4 text-slate-600">{expense.date}</td>
                  <td className="px-5 py-4 text-right font-bold text-coral">{formatCurrency(expense.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
