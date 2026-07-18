import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending,isError, error } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //   console.log("Form Submitted");
    //   console.log({
    //   email,
    //   password,
    // });
    mutate({
      email: email,
      password: password,
    });
  }
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div
        className="
        w-full max-w-5xl
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-2xl
        grid
        md:grid-cols-2
      "
      >
        {/* Left Travel Image Section */}
        <div
          className="
          hidden md:flex
          relative
          bg-cover
          bg-center
          items-end
          p-10
        "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
          }}
        >
          <div
            className="
            absolute inset-0
            bg-gradient-to-t
            from-black/70
            to-transparent
          "
          />

          <div className="relative text-white">
            <h1
              className="
              text-4xl
              font-bold
              mb-3
            "
            >
              Explore the world 🌎
            </h1>

            <p
              className="
              text-slate-200
              max-w-sm
            "
            >
              Discover amazing destinations, book unforgettable tours and create
              memories that last forever.
            </p>
          </div>
        </div>

        {/* Login Section */}
        <div
          className="
          p-2
          md:p-12
        "
        >
          <div className="mb-8">
            <h2
              className="
              text-3xl
              font-bold
              text-slate-800
            "
            >
              Welcome Back 👋
            </h2>

            <p
              className="
              text-slate-500
              mt-2
            "
            >
              Login to continue your journey
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                className="
                text-sm
                font-medium
                text-slate-700
              "
              >
                Email Address
              </label>

              <div
                className="
                mt-2
                relative
              "
              >
                <Mail
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  placeholder="Enter your email"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    py-3
                    pl-12
                    pr-4
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-200
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="
                text-sm
                font-medium
                text-slate-700
              "
              >
                Password
              </label>

              <div
                className="
                mt-2
                relative
              "
              >
                <Lock
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    py-3
                    pl-12
                    pr-12
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-200
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div
              className="
              flex
              justify-between
              text-sm
            "
            >
              <label className="flex gap-2 items-center">
                <input type="checkbox" />
                Remember me
              </label>

              <Link to={"/forgotPassword"}
                className="
                text-emerald-600
                font-medium
              "
              >
                Forgot password?
              </Link>
            </div>

            {isError && <p className="text-red-500 mt-2">{error.message}</p>}

            <button
              type="submit"
              disabled={isPending}
              className="
                w-full
                rounded-xl
                bg-gradient-to-r
                from-emerald-500
                to-green-600
                py-3
                text-white
                font-semibold
                shadow-lg
                hover:shadow-xl
                transition
              "
            >
               {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <p
            className="
            text-center
            text-sm
            text-slate-500
            mt-8
          "
          >
            Don't have an account?
            <Link to={"/signUp"}>
              <span
                className="
              text-emerald-600
              font-semibold
              ml-1
              cursor-pointer
            "
              >
                Create Account
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
