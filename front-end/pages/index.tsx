import Head from "next/head";
import { useState } from "react";
import Login from "../components/login";
import Register from "../components/register";
import styles from "@/styles/Home.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Language from "../components/language/language";
import Products from "@/components/products";

export default function Home() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showProducts, setShowProducts] = useState(false); // State for showing products

  const toggleView = () => {
    setIsLoginView((prev) => !prev);
  };

  const toggleProducts = () => {
    setShowProducts((prev) => !prev);
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
        <h1 className={styles.title}>{t("app.title")}</h1>
        <hr className={styles.line} />
        <Language />
        {isLoginView ? (
          <Login toggleView={toggleView} />
        ) : (
          <Register toggleView={toggleView} />
        )}
        <button onClick={toggleProducts} className={styles.button}>
          {showProducts ? t("app.hide_products") : t("app.show_products")}
        </button>
        {showProducts && <Products />}
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
