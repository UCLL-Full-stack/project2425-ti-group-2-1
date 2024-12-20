import Head from "next/head";
import { useState, useEffect } from "react"; // Import useEffect
import Login from "./customer-login/page";
import Register from "./customer-register/page";
import styles from "@/styles/Home.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Language from "../components/language/language";
import Products from "@/pages/show-products/page";
import { useRouter } from 'next/router';

export default function Home() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // This code runs on the client-side after the component has mounted
    const loggedInUser = localStorage.getItem('loggedInUser');
    console.log("Logged In User:", loggedInUser); // Log to check if the data is available

    if (loggedInUser) {
      try {
        const { email } = JSON.parse(loggedInUser); // Parse the stored data
        console.log("Email from LocalStorage:", email); // Log the extracted email
        setUserEmail(email);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setErrorMessage('Error loading user information.');
      }
    } else {
      setErrorMessage('You must be logged in to place an order.');
    }
  }, []); // Empty dependency array means this runs only once after the initial render

  const toggleView = () => {
    setIsLoginView((prev) => !prev);
  };

  const toggleProducts = () => {
    setShowProducts((prev) => !prev);
  };

  const navigateToAddressPage = () => {
    if (userEmail) {
      router.push('/update-address');
    } else {
      setErrorMessage('You must be logged in to update your address.');
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta
          name="description"
          content="Toggle between login and register views"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t("app.title")}</h1>
          <hr className={styles.line} />
          <div className={styles.language}>
            <Language />
          </div>
        </header>

        {errorMessage && <p>{errorMessage}</p>} {/* Display error message */}

        {isLoginView ? (
          <Login toggleView={toggleView} />
        ) : (
          <Register toggleView={toggleView} />
        )}

        {/* Show Change Address Button */}
        {userEmail && (
          <button onClick={navigateToAddressPage} className={styles.changeAddressButton}>
            Change Address
          </button>
        )}

        <Products />
      </main>
    </>
  );
}

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
