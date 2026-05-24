import Card from "./Card.jsx";

export default function StatCard({ label, value, icon: Icon, tone = "mint" }) {
  const tones = {
    mint: "bg-teal-50 text-mint",
    coral: "bg-red-50 text-coral",
    amber: "bg-orange-50 text-amber",
    ink: "bg-slate-100 text-ink",
  };

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-normal text-ink">{value}</p>
        </div>
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-md ${tones[tone]}`}>
          <Icon size={21} />
        </span>
      </div>
    </Card>
  );
}
