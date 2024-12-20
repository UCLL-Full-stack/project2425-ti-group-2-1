import Head from "next/head";
import { useState, useEffect } from "react";
import Login from "../components/login";
import Register from "../components/register";
import styles from "@/styles/Home.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Language from "../components/language/language";
import Products from "@/pages/show-products/page";
import { useRouter } from "next/router";

export default function Home() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // Check if the user is logged in by retrieving their email from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      try {
        const { email } = JSON.parse(loggedInUser);
        setUserEmail(email);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setErrorMessage("Error loading user information.");
      }
    } else {
      setErrorMessage("You must be logged in to place an order.");
    }
  }, []);

  // Toggle between login and register view
  const toggleView = () => {
    setIsLoginView((prev) => !prev);
  };

  // Navigate to address page if the user is logged in
  const navigateToAddressPage = () => {
    if (userEmail) {
      router.push("/change-address/page");
    } else {
      setErrorMessage("You must be logged in to update your address.");
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="Toggle between login and register views" />
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

        {errorMessage && <p>{errorMessage}</p>}

        {/* Show Login/Register view if user is not logged in */}
        {userEmail ? (
          <>
            {/* Show the main content once the user is logged in */}
            <button onClick={navigateToAddressPage} className={styles.changeAddressButton}>
              Change Address
            </button>
            <Products />
          </>
        ) : (
          <>
            {/* Show Login/Register components when not logged in */}
            {isLoginView ? (
              <Login toggleView={toggleView} />
            ) : (
              <Register toggleView={toggleView} />
            )}
          </>
        )}
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
