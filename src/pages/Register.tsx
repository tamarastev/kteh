import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { IconPerson, IconMail, IconLock } from "../components/Icons";
import { useAuth } from "../context/AuthContext";
import "./AuthPages.scss";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!agree) {
      setError("Morate prihvatiti uslove korišćenja.");
      return;
    }

    const result = register({
      fullName,
      email,
      password,
      phone: "",
      location: "",
      joinedYear: new Date().getFullYear(),
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/properties", { replace: true });
  };

  return (
    <div className="hs-auth">
      <div className="hs-auth__content">
        <h1>Create Your Account</h1>
        <p>Start exploring apartments, houses, and more.</p>

        <form className="hs-auth__card" onSubmit={handleSubmit}>
          <FormField
            label="Full Name"
            icon={<IconPerson />}
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
            placeholder="Create your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
          />
          {error && <p className="hs-auth__error">{error}</p>}

          <Button type="submit" fullWidth>
            Register
          </Button>

          <p className="hs-auth__switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <label className="hs-auth__checkbox">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            I agree to Terms &amp; Conditions
          </label>
        </form>
      </div>
    </div>
  );
}
