// components/Register.tsx
import { useState } from 'react';
import styles from '../styles/register.module.css';

interface RegisterProps {
    toggleView: () => void;
}

const Register: React.FC<RegisterProps> = ({ toggleView }) => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        number: '',
        address: {
            housecode: '',
            street: '',
            postalcode: ''
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
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
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="number">Phone Number</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
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
                            value={formData.address.housecode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="street">Street</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.address.street}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="postalcode">Postal Code</label>
                        <input
                            type="text"
                            id="postalcode"
                            name="postalcode"
                            value={formData.address.postalcode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </fieldset>

                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <button onClick={toggleView}>Sign In</button></p>
        </div>
    );
};

export default Register;
