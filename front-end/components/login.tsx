// components/Login.tsx
import { useState } from 'react';
import styles from '../styles/login.module.css';
import loginService from '@services/LoginService';

interface LoginProps {
    toggleView: () => void;
}

const Login: React.FC<LoginProps> = ({ toggleView }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const credentials = { email, password };

        try {
            const response = await loginService.handleLogin(credentials);
            setSuccessMessage('Login successful! Welcome back.');
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="email">Email</label>
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
                    <label className={styles.label} htmlFor="password">Password</label>
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

                <button type="submit">Sign in</button>
            </form>
            <p>Don't have an account? <button onClick={toggleView}>Sign Up</button></p>
        </div>
    );
};

export default Login;
