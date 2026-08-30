import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { IconMail, IconLock } from "../components/Icons";
import { useAuth } from "../context/AuthContext";
import "./AuthPages.scss";

interface LocationState {
  from?: { pathname: string };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    const state = location.state as LocationState | null;
    const destination = state?.from?.pathname ?? "/properties";
    navigate(destination, { replace: true });
  };

  return (
    <div className="hs-auth">
      <div className="hs-auth__content">
        <h1>WELCOME!</h1>
        <p>Sign in to your account</p>

        <form className="hs-auth__card" onSubmit={handleSubmit}>
          <FormField
            label="Email"
            icon={<IconMail />}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormField
            label="Password"
            icon={<IconLock />}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="hs-auth__error">{error}</p>}

          <Button type="submit" fullWidth>
            LOG IN
          </Button>

          <Link to="/register" className="hs-auth__link">
            Forgot password?
          </Link>
          <p className="hs-auth__switch">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
