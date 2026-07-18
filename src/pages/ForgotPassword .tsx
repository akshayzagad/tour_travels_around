import { Mail, ArrowLeft, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../hooks/useForgotPassword";
import type { forgotPassword } from "../../types/user";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm<forgotPassword>();
  const { mutate: forgotPassword } = useForgotPassword();
  const onSubmit = (data: forgotPassword) => {
    console.log(data);
    
    forgotPassword(data)
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <LockKeyhole size={38} className="text-emerald-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Forgot Password?
          </h1>

          <p className="mt-3 text-center text-slate-500">
            Enter your registered email address and we'll send you a password
            reset link.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>
          </div>

          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 font-semibold text-white transition hover:shadow-lg">
            Send Reset Link
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

export default ForgotPassword;
