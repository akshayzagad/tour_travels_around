import type { TourGuide } from "../../../types/tour";

interface GuideCardProps {
  guide: TourGuide;
  userImageBaseUrl: string;
}

export default function GuideCard({ guide, userImageBaseUrl }: GuideCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl">
      <div className="flex items-center gap-6">
        <img
          src={guide.photo ? `${userImageBaseUrl}/${guide.photo}` : "/default-avatar.png"}
          alt={guide.name}
          className="h-24 w-24 rounded-full bg-slate-200 object-cover"
        />

        <div>
          <h3 className="text-2xl font-bold text-slate-900">{guide.name}</h3>
          <p className="mt-1 text-emerald-600">{guide.role}</p>
          <p className="mt-2 text-slate-500">{guide.email}</p>
        </div>
      </div>
    </div>
  );
}
