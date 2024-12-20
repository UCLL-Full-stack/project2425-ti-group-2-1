import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Address.module.css"; 
import addressService from "@/services/AddressService"; 
import { useTranslation } from "next-i18next";

const ChangeAddress: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [street, setStreet] = useState<string>("");
  const [housecode, setHousecode] = useState<string>("");
  const [postalcode, setPostalcode] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");


  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const { email } = JSON.parse(loggedInUser);
      setUserEmail(email);
    } else {
      setError("You must be logged in to change your address.");
    }
  }, []);

  // Handle address update
  const handleChangeAddress = async () => {
    if (!userEmail) {
      setError("You must be logged in to change your address.");
      return;
    }

    try {
      const response = await addressService.updateAddress(
        userEmail,
        street,
        housecode,
        postalcode
      );
      setMessage("Address successfully updated.");
      setStreet(""); 
      setHousecode("");
      setPostalcode("");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setError("Failed to update the address.");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{t("address.changeAddress")}</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {message && <p className={styles.successMessage}>{message}</p>}
      <div className={styles.formGroup}>
        <label htmlFor="street">{t("address.street")}</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder={t("address.enterStreet")}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="housecode">{t("address.housecode")}</label>
        <input
          type="text"
          id="housecode"
          value={housecode}
          onChange={(e) => setHousecode(e.target.value)}
          placeholder={t("address.enterHousecode")}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="postalcode">{t("address.postalcode")}</label>
        <input
          type="text"
          id="postalcode"
          value={postalcode}
          onChange={(e) => setPostalcode(e.target.value)}
          placeholder={t("address.enterPostalcode")}
        />
      </div>

      <button onClick={handleChangeAddress} className={styles.changeButton}>
        {t("address.changeButton")}
      </button>
    </div>
  );
};

export default ChangeAddress;
