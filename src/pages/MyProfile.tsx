import { Settings } from "lucide-react";
import ProfileForm from "../component/forms/profileForm";
import { useUser } from "../hooks/useUser";

const MyProfile = () => {
  const { data: user } = useUser();
  console.log(user);
  

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-7 flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Settings size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">Account settings</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">My profile</h1>
            <p className="mt-2 text-slate-500">Keep your details and account security up to date.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-8">
          <ProfileForm initialName={user?.name} initialEmail={user?.email} initialPhoto={user?.photo} />
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
