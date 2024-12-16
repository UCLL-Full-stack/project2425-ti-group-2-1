import { useState } from "react";
import styles from "../styles/Login.module.css";
import loginService from "../services/LoginService";
import { useTranslation } from "next-i18next";

interface LoginProps {
  toggleView: () => void;
}

const Login: React.FC<LoginProps> = ({ toggleView }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const credentials = { email, password };

    try {
      const response = await loginService.handleLogin(credentials);
      setSuccessMessage("Login successful! Welcome back.");
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>{t("login.title")}</h2>
      <form onSubmit={handleSubmit}>
        <section className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            {t("login.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </section>

        <section className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">
            {t("login.password")}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>

        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        <button type="submit">{t("login.signInButton")}</button>
      </form>
      <p>
        {t("login.dontHaveAccount")}{" "}
        <button onClick={toggleView}>{t("login.signUp")}</button>
      </p>
    </div>
  );
};

export default Login;
