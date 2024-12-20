import { useState } from "react";
import styles from "@/styles/Register.module.css";
import registerService from "@/services/RegisterService";
import { useTranslation } from "next-i18next";

interface RegisterProps {
  toggleView: () => void;
}

const Register: React.FC<RegisterProps> = ({ toggleView }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [housecode, setHousecode] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [postalcode, setPostalcode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  /*const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        number: '',
        address: {
            housecode: '',
            street: '',
            postalcode: ''
        }
    });*/

  /*const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };*/

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const address = { housecode, street, postalcode };

    const credentials = { name, email, number, password, address };

    try {
      const response = await registerService.handleRegister(credentials);
      setSuccessMessage("register successful! Welcome.");
    } catch (error) {
      setError("regiester failed, account already exists.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>{t("register.title")}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">
            {t("register.name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            {t("register.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="number">
            {t("register.phoneNumber")}
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">
            {t("register.password")}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <fieldset className={styles.addressFieldset}>
          <legend>{t("register.address.title")}</legend>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="housecode">
              {t("register.address.houseCode")}
            </label>
            <input
              type="text"
              id="housecode"
              name="housecode"
              value={housecode}
              onChange={(e) => setHousecode(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="street">
              {t("register.address.street")}
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="postalcode">
              {t("register.address.postalCode")}
            </label>
            <input
              type="text"
              id="postalcode"
              name="postalcode"
              value={postalcode}
              onChange={(e) => setPostalcode(e.target.value)}
              required
            />
          </div>
        </fieldset>

        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        <button type="submit">{t("register.registerButton")}</button>
      </form>

      <p>
        {t("register.alreadyHaveAccount")}{" "}
        <button onClick={toggleView} className={styles.signInButton}>
          {t("register.signIn")}
        </button>
      </p>
    </div>
  );
};

export default Register;
