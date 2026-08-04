import { Camera, Eye, EyeOff, Lock, Mail, Save, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { updateMe } from "../../../types/user";
import { useUpdateMe } from "../../hooks/useUpdateMe";

type ProfileFormProps = {
  initialName?: string;
  initialEmail?: string;
  initialPhoto?: string;
};

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

function ProfileForm({
  initialName = "",
  initialEmail = "",
  initialPhoto,
}: ProfileFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(initialPhoto ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateMe, isUpdatingMe } = useUpdateMe();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<updateMe>({
    defaultValues: { name: initialName, email: initialEmail },
  });
  useEffect(() => {
    reset({ name: initialName, email: initialEmail });
    setPhotoPreview(initialPhoto ?? "");
  }, [initialEmail, initialName, initialPhoto, reset]);

  useEffect(() => {
    return () => {
      if (photoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);
  
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("photo", file, { shouldDirty: true });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const profileImageSrc = photoPreview.startsWith("blob:") || photoPreview.startsWith("http")
    ? photoPreview
    : `${import.meta.env.VITE_API_URL}/img/users/${photoPreview}`;

  return (
    <div className="space-y-7">
      <form
        className="rounded-2xl border border-slate-100 p-5 sm:p-6"
        onSubmit={handleSubmit((data) => updateMe(data))}
      >
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800">
            Profile information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Update the details shown on your account.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-2xl bg-emerald-50/70 px-5 py-6 sm:flex-row sm:text-left">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-emerald-100 ring-4 ring-white shadow-md"
            aria-label="Choose profile image"
          >
            {photoPreview ? (
              <img
                src={profileImageSrc}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <User
                className="m-auto h-full w-11 text-emerald-600"
                aria-hidden="true"
              />
            )}
            <span className="absolute inset-0 grid place-items-center bg-slate-900/55 text-white opacity-0 transition group-hover:opacity-100">
              <Camera size={22} />
            </span>
          </button>
          <div className="text-center sm:text-left">
            <h2 className="font-semibold text-slate-800">Profile picture</h2>
            <p className="mt-1 text-sm text-slate-500">
              PNG, JPG or WEBP. Upload a clear photo of yourself.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
            >
              Upload new photo
            </button>
            <input
              ref={fileInputRef}
              onChange={handlePhotoChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Full name
            </span>
            <span className="relative mt-2 block">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Enter your full name"
                className={fieldClass}
                {...register("name", { required: "Your name is required" })}
              />
            </span>
            {errors.name && (
              <span className="mt-1 block text-sm text-red-600">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Email address
            </span>
            <span className="relative mt-2 block">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                placeholder="you@example.com"
                className={fieldClass}
                {...register("email", {
                  required: "Your email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </span>
            {errors.email && (
              <span className="mt-1 block text-sm text-red-600">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            disabled={isUpdatingMe}
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save size={18} /> {isUpdatingMe ? "Saving..." : "Save profile"}
          </button>
        </div>
      </form>

      <form
        className="rounded-2xl border border-slate-100 p-5 sm:p-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800">
            Password & security
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Leave these fields blank if you do not want to change your password.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              New password
            </span>
            <span className="relative mt-2 block">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Leave blank to keep current"
                className={`${fieldClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Confirm new password
            </span>
            <span className="relative mt-2 block">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="passwordConfirm"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat your new password"
                className={`${fieldClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </span>
          </label>
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-100 pt-6">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-700"
          >
            <Lock size={18} /> Update password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
