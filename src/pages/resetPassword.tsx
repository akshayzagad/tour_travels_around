import { useState } from "react";
import { Lock, Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { resetPassword } from "../../types/user";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit } = useForm<resetPassword>();
  const { mutate: resetPassword, isPending } = useResetPassword();

  const onSubmit = async (data: resetPassword) => {
    console.log(data);
    if (!token) return;
    resetPassword({ token, ...data });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <ShieldCheck size={40} className="text-emerald-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">Reset Password</h1>

          <p className="mt-2 text-slate-500">
            Create a new password for your account.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* New Password */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              New Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showConfirm ? "text" : "password"}
                {...register("passwordConfirm")}
                placeholder="Confirm password"
                className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 font-semibold text-white transition hover:shadow-lg">
            {isPending ? "Reset Password..." : "Reset Password"}
          </button>
        </form>

        <Link
          to="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
