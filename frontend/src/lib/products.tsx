import axios from "axios";
import { CONSTANTS } from "../types/constants";
import { Product, ProductDetails } from "../types/models";
import type { NextApiRequest, NextApiResponse } from 'next'

interface ProductDataProps {
  data: Product[];
}
interface ProductDetailsProps {
  data: ProductDetails;
}

export async function loadProducts() {
  try {
    const { data }: ProductDataProps = await axios.get(
      `${CONSTANTS.URL}/products?limit=3000`
    );
    return data;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
}

export async function loadProductDetails(productId: string) {
  try {
    const { data }: ProductDetailsProps = await axios.get(
      `${CONSTANTS.URL}/products/${productId}`
    );
    return data;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
}
