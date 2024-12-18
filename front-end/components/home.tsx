import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useTranslation } from "next-i18next";

interface HomeProps {
    toggleView: () => void;
  }

const Home: React.FC<HomeProps> = ({ toggleView }) => {
    const { t } = useTranslation();

    const handleGet = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await homeService.handleGetProducts();
        }
    }
}