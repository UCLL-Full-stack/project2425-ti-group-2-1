// components/Register.tsx
import { useState } from 'react';
import styles from '../styles/Register.module.css';
import registerService from '../services/RegisterService';

interface RegisterProps {
    toggleView: () => void;
}

const Register: React.FC<RegisterProps> = ({ toggleView }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [housecode, setHousecode] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [postalcode, setPostalcode] = useState<string>('');
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

        const address = {housecode, street, postalcode};

        const credentials = { name, email, number, password, address};

        try {
            const response = await registerService.handleRegister(credentials);
            setSuccessMessage('register successful! Welcome.');
        } catch (error) {
            setError('regiester failed, account already exists.');
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="name">Name</label>
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
                    <label className={styles.label} htmlFor="email">Email</label>
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
                    <label className={styles.label} htmlFor="number">Phone Number</label>
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
                    <label className={styles.label} htmlFor="password">Password</label>
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
                    <legend>Address</legend>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="housecode">Housecode</label>
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
                        <label className={styles.label} htmlFor="street">Street</label>
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
                        <label className={styles.label} htmlFor="postalcode">Postal Code</label>
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

                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <button onClick={toggleView}>Sign In</button></p>
        </div>
    );
};

export default Register;
