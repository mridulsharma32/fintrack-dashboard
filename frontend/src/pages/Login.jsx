import { LogIn, WalletCards } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login, startDemo } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch {
      toast.error("Check your email and password");
    } finally {
      setLoading(false);
    }
  }

  function handleDemo() {
    startDemo();
    toast.success("Demo dashboard opened");
    navigate("/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4 py-8">
      <Card className="w-full max-w-md p-6">
        <div className="mb-7 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-mint text-white">
            <WalletCards size={22} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-ink">FinTrack</h1>
            <p className="text-sm text-slate-500">Sign in to your dashboard</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />
          </label>
          <Button className="w-full" type="submit" disabled={loading}>
            <LogIn size={18} />
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <button
          className="focus-ring mt-3 h-10 w-full rounded-md border border-black/10 bg-white px-4 text-sm font-semibold text-ink transition hover:bg-slate-50"
          type="button"
          onClick={handleDemo}
        >
          Open recruiter demo
        </button>
        <p className="mt-5 text-center text-sm text-slate-500">
          New here?{" "}
          <Link className="font-semibold text-mint" to="/register">
            Create an account
          </Link>
        </p>
      </Card>
    </main>
  );
}
