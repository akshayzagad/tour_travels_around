import { User, Mail, Lock, Eye, EyeOff, Upload } from "lucide-react";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="
      min-h-screen
      bg-slate-100
      flex
      items-center
      justify-center
      p-4
    "
    >
      <div
        className="
        w-full
        max-w-5xl
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-2xl
        grid
        md:grid-cols-2
      "
      >
        {/* Left Image Section */}

        <div
          className="
            hidden
            md:flex
            relative
            bg-cover
            bg-center
            items-end
            p-5
          "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')",
          }}
        >
          <div
            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            to-transparent
          "
          />

          <div
            className="
            relative
            text-white
          "
          >
            <h1
              className="
              text-4xl
              font-bold
              mb-3
            "
            >
              Start Your Journey 🌍
            </h1>

            <p
              className="
              text-slate-200
              max-w-sm
            "
            >
              Create an account and explore breathtaking destinations around the
              world.
            </p>
          </div>
        </div>

        {/* Signup Form */}

        <div
          className="
          p-3
          md:py-6
          md:px-12
        "
        >
          <div className="mb-7">
            <h2
              className="
              text-3xl
              font-bold
              text-slate-800
            "
            >
              Create Account ✨
            </h2>

            <p
              className="
              text-slate-500
              mt-2
            "
            >
              Join us and start exploring
            </p>
          </div>

          <form className="space-y-4">
            {/* Name */}

            <div>
              <label
                className="
                text-sm
                font-medium
                text-slate-700
              "
              >
                Full Name
              </label>

              <div
                className="
                mt-2
                relative
              "
              >
                <User
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
                  type="text"
                  placeholder="Enter your name"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    py-3
                    pl-12
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-200
                  "
                />
              </div>
            </div>

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

              <div className="mt-2 relative">
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
                  placeholder="Enter your email"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    py-3
                    pl-12
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
                  text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
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
                  focus:ring-emerald-200"
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

            {/* Confirm Password */}

            <div>
              <label
                className="
                text-sm
                font-medium
                text-slate-700
              "
              >
                Confirm Password
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
                  text-slate-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
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
                  focus:ring-emerald-200"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Profile Upload */}

            <div
              className="
              flex
              items-center
              gap-3
              border
              border-dashed
              rounded-xl
              p-3
              cursor-pointer
            "
            >
              <Upload size={20} className="text-emerald-500" />

              <span
                className="
                text-sm
                text-slate-500
              "
              >
                Upload profile photo
              </span>
            </div>

            <label
              className="
              flex
              gap-2
              items-center
              text-sm
              text-slate-600
            "
            >
              <input type="checkbox" />I agree to terms & conditions
            </label>

            <button
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
              Create Account
            </button>
          </form>

          <p
            className="
            text-center
            text-sm
            text-slate-500
            mt-6
          "
          >
            Already have an account?
            <span
              className="
              text-emerald-600
              font-semibold
              ml-1
            "
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
