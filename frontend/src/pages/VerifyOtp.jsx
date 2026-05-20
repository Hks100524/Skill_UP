import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const inputClassName =
  "h-[56px] w-full rounded-[16px] border border-[#d8d8de] bg-white px-4 text-[15px] text-[#111827] transition placeholder:text-[#6b7280] focus:border-[#111827] focus:outline-none focus:ring-0 dark:border-white/10 dark:bg-[#151515] dark:text-white dark:placeholder:text-[#9ca3af]";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email] = useState(() => localStorage.getItem("otpEmail")?.trim() || "");

  const navigate = useNavigate();
  const { login, token } = useContext(AuthContext);

  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      navigate("/", { replace: true });
      return;
    }

    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      navigate("/register", { replace: true });
      return;
    }

    const cleanOtp = String(otp).trim();

    if (!cleanOtp) {
      setError("Please enter OTP.");
      return;
    }

    if (cleanOtp.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-email`, {
        email,
        otp: cleanOtp,
      });

      login(res.data.token);
      localStorage.removeItem("otpEmail");
      alert("Account verified successfully");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setMessage("");

    if (!email) {
      navigate("/register", { replace: true });
      return;
    }

    try {
      setResending(true);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-verify-otp`, {
        email,
      });

      setMessage(res.data?.message || "New OTP sent to email");
      setOtp("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen bg-[#f3f3f3] px-4 py-8 text-[#111827] dark:bg-[#090909] dark:text-white sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col overflow-hidden rounded-[24px] border border-[#d9d9d9] bg-white p-4 shadow-[0_25px_70px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-[#111111] lg:flex-row lg:gap-8 lg:p-6">
        <div className="h-[280px] overflow-hidden rounded-[20px] lg:h-auto lg:min-h-[700px] lg:flex-1">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
            alt="Developer desk setup"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 items-center justify-center px-2 py-6 sm:px-4 lg:px-6">
          <div className="w-full max-w-[530px]">
            <h1 className="text-center text-[34px] font-semibold tracking-[-0.03em] text-[#111827] dark:text-white sm:text-[42px]">
              Verify OTP
            </h1>
            <p className="mt-3 text-center text-[16px] text-[#5b6472] dark:text-[#9ca3af]">
              Enter the 6-digit code sent to your email
            </p>
            <p className="mt-3 text-center text-[15px] font-medium text-[#111827] dark:text-white">
              {email}
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="mb-3 block text-[15px] font-semibold text-[#111827] dark:text-white"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setOtp(value);
                  }}
                  required
                  inputMode="numeric"
                  maxLength={6}
                  disabled={loading}
                  className={inputClassName}
                />
              </div>

              {error ? (
                <p className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                  {error}
                </p>
              ) : null}

              {message ? (
                <p className="rounded-[14px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading || resending || otp.trim().length !== 6}
                className="h-[56px] w-full rounded-[16px] bg-[#0a0a0a] text-[16px] font-semibold text-white transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading || resending}
                className="h-[56px] w-full rounded-[16px] border border-[#d8d8de] bg-white text-[16px] font-semibold text-[#111827] transition hover:bg-[#f8f8f8] disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-[#151515] dark:text-white dark:hover:bg-[#1b1b1b]"
              >
                {resending ? "Resending OTP..." : "Resend OTP"}
              </button>
            </form>

            <p className="mt-7 text-center text-[15px] text-[#5b6472] dark:text-[#9ca3af]">
              Need another account?{" "}
              <Link to="/register" className="font-semibold text-[#111827] hover:underline dark:text-white">
                Sign up here
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
