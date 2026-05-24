import { UserPlus, WalletCards } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created");
      navigate("/dashboard");
    } catch {
      toast.error("Could not create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4 py-8">
      <Card className="w-full max-w-md p-6">
        <div className="mb-7 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-mint text-white">
            <WalletCards size={22} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-ink">Create FinTrack</h1>
            <p className="text-sm text-slate-500">Start tracking your money clearly</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Name</span>
            <input
              className="focus-ring mt-1 h-11 w-full rounded-md border border-black/10 px-3"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              className="focus-ring mt-1 h-11 w-full rounded-md border border-black/10 px-3"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Password</span>
            <input
              className="focus-ring mt-1 h-11 w-full rounded-md border border-black/10 px-3"
              type="password"
              minLength={8}
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />
          </label>
          <Button className="w-full" type="submit" disabled={loading}>
            <UserPlus size={18} />
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link className="font-semibold text-mint" to="/login">
            Sign in
          </Link>
        </p>
      </Card>
    </main>
  );
}
