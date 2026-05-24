import { Activity, AlertTriangle, Brain, CalendarClock } from "lucide-react";

import Card from "../components/ui/Card.jsx";

const items = [
  {
    icon: Brain,
    title: "AI spending insights",
    text: "Generate plain-English summaries from category trends, budget usage, and imported bank statements.",
  },
  {
    icon: CalendarClock,
    title: "Subscription detection",
    text: "Detect repeated merchant names and recurring amounts to identify hidden monthly commitments.",
  },
  {
    icon: AlertTriangle,
    title: "Budget alerts",
    text: "Trigger warnings when a category crosses 80 percent or 100 percent of the monthly budget.",
  },
  {
    icon: Activity,
    title: "Savings prediction",
    text: "Estimate end-of-month savings using current spend velocity and historical averages.",
  },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink">Advanced analytics roadmap</h2>
        <p className="mt-1 text-sm text-slate-500">These modules turn the project into strong interview material.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.title} className="p-5">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-teal-50 text-mint">
              <item.icon size={21} />
            </span>
            <h3 className="mt-4 font-bold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
