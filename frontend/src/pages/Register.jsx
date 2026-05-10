import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const inputClassName =
  "h-[56px] w-full rounded-[16px] border border-[#d8d8de] bg-white px-4 text-[15px] text-[#111827] transition placeholder:text-[#6b7280] focus:border-[#111827] focus:outline-none focus:ring-0 dark:border-white/10 dark:bg-[#151515] dark:text-white dark:placeholder:text-[#9ca3af]";

export default function Register() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      };

      await axios.post("http://localhost:5000/api/auth/register", {
        ...payload,
      });

      localStorage.setItem("otpEmail", payload.email);
      alert("Account created. Check your email for OTP.");
      navigate("/verify-otp");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] px-4 py-8 text-[#111827] dark:bg-[#090909] dark:text-white sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col overflow-hidden rounded-[24px] border border-[#d9d9d9] bg-white p-4 shadow-[0_25px_70px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-[#111111] lg:flex-row lg:gap-8 lg:p-6">
        <div className="h-[280px] overflow-hidden rounded-[20px] lg:h-auto lg:min-h-[760px] lg:flex-1">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
            alt="Developer workspace"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 items-center justify-center px-2 py-6 sm:px-4 lg:px-6">
          <div className="w-full max-w-[530px]">
            <h1 className="text-center text-[34px] font-semibold tracking-[-0.03em] text-[#111827] dark:text-white sm:text-[42px]">
              Create your account
            </h1>
            <p className="mt-3 text-center text-[16px] text-[#5b6472] dark:text-[#9ca3af]">
              Welcome! Enter your details to get started
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-3 block text-[15px] font-semibold text-[#111827] dark:text-white"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="mb-3 block text-[15px] font-semibold text-[#111827] dark:text-white"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-[15px] font-semibold text-[#111827] dark:text-white"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-3 block text-[15px] font-semibold text-[#111827] dark:text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-3 block text-[15px] font-semibold text-[#111827] dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className={inputClassName}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-[56px] w-full rounded-[16px] bg-[#0a0a0a] text-[16px] font-semibold text-white transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <button
              type="button"
              className="mt-4 flex h-[56px] w-full items-center justify-center gap-3 rounded-[16px] border border-[#d8d8de] bg-white text-[16px] font-semibold text-[#111827] transition hover:bg-[#f8f8f8] dark:border-white/10 dark:bg-[#151515] dark:text-white dark:hover:bg-[#1b1b1b]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5Z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3c-2.1 1.6-4.7 2.5-7.3 2.5-5.1 0-9.5-3.3-11.1-8l-6.5 5C9.7 39.6 16.3 44 24 44Z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.2 5.2-4 5.9l6.3 5.3C37.2 39 44 34 44 24c0-1.2-.1-2.4-.4-3.5Z"
                />
              </svg>
              Continue with Google
            </button>

            <p className="mt-6 text-center text-[15px] text-[#5b6472] dark:text-[#9ca3af]">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-[#111827] hover:underline dark:text-white">
                Login here
              </Link>
            </p>

            <p className="mt-3 text-center text-[15px] text-[#5b6472] dark:text-[#9ca3af]">
              <Link to="/" className="hover:underline">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
