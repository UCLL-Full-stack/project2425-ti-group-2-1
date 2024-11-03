import Head from "next/head";
import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import styles from "@/styles/Home.module.css";

export default function Home() {
    const [isLoginView, setIsLoginView] = useState(true);

    const toggleView = () => {
        setIsLoginView((prev) => !prev);
    };

    return (
        <>
            <Head>
                <title>Welcome to the Home Page</title>
                <meta name="description" content="Toggle between login and register views" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>Welcome to the Home Page</h1>
                {isLoginView ? (
                    <Login toggleView={toggleView} />
                ) : (
                    <Register toggleView={toggleView} />
                )}
            </main>
        </>
    );
}
