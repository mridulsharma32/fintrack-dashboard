import { Plus, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import { demoPortfolio } from "../data/demoData.js";
import { api } from "../services/api.js";

const formatCurrency = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value));

export default function Portfolio() {
  const [positions, setPositions] = useState(demoPortfolio);
  const [form, setForm] = useState({ stock_symbol: "", company_name: "", quantity: "", buy_price: "", current_price: "" });

  async function loadPositions() {
    try {
      const { data } = await api.get("/api/portfolio");
      setPositions(data);
    } catch {
      setPositions(demoPortfolio);
    }
  }

  useEffect(() => {
    loadPositions();
  }, []);

  async function addPosition(event) {
    event.preventDefault();
    try {
      await api.post("/api/portfolio", {
        ...form,
        quantity: Number(form.quantity),
        buy_price: Number(form.buy_price),
        current_price: Number(form.current_price),
      });
      setForm({ stock_symbol: "", company_name: "", quantity: "", buy_price: "", current_price: "" });
      await loadPositions();
      toast.success("Position added");
    } catch {
      toast.error("Start the backend to save portfolio positions");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card className="p-5">
        <h2 className="text-lg font-bold text-ink">Add stock position</h2>
        <form className="mt-4 space-y-4" onSubmit={addPosition}>
          <input className="focus-ring h-11 w-full rounded-md border border-black/10 px-3 uppercase" placeholder="Symbol" value={form.stock_symbol} onChange={(event) => setForm({ ...form, stock_symbol: event.target.value.toUpperCase() })} required />
          <input className="focus-ring h-11 w-full rounded-md border border-black/10 px-3" placeholder="Company name" value={form.company_name} onChange={(event) => setForm({ ...form, company_name: event.target.value })} />
          <input className="focus-ring h-11 w-full rounded-md border border-black/10 px-3" placeholder="Quantity" type="number" min="1" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} required />
          <input className="focus-ring h-11 w-full rounded-md border border-black/10 px-3" placeholder="Buy price" type="number" min="1" value={form.buy_price} onChange={(event) => setForm({ ...form, buy_price: event.target.value })} required />
          <input className="focus-ring h-11 w-full rounded-md border border-black/10 px-3" placeholder="Current price" type="number" min="1" value={form.current_price} onChange={(event) => setForm({ ...form, current_price: event.target.value })} required />
          <Button className="w-full" type="submit">
            <Plus size={18} />
            Add position
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        {positions.map((position) => (
          <Card key={position.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-ink">{position.stock_symbol}</h3>
                  <span className="rounded bg-teal-50 px-2 py-1 text-xs font-bold text-mint">{position.profit_loss_percent}%</span>
                </div>
                <p className="text-sm text-slate-500">{position.company_name || "Position"}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-ink">{formatCurrency(position.market_value)}</p>
                <p className={Number(position.profit_loss) >= 0 ? "text-sm font-semibold text-mint" : "text-sm font-semibold text-coral"}>
                  {formatCurrency(position.profit_loss)}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <p className="rounded-md bg-slate-50 p-3">
                <span className="block text-slate-500">Quantity</span>
                <strong>{position.quantity}</strong>
              </p>
              <p className="rounded-md bg-slate-50 p-3">
                <span className="block text-slate-500">Buy price</span>
                <strong>{formatCurrency(position.buy_price)}</strong>
              </p>
              <p className="rounded-md bg-slate-50 p-3">
                <span className="block text-slate-500">Current</span>
                <strong>{formatCurrency(position.current_price)}</strong>
              </p>
            </div>
          </Card>
        ))}
        <Card className="p-5">
          <div className="flex items-center gap-3 text-slate-600">
            <TrendingUp size={20} />
            <p className="text-sm font-medium">Live market API integration is the next portfolio milestone.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
