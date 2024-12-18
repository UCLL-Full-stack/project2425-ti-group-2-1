import {Product} from "@/types";

async function handleGetProducts(): Promise<Product[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
}