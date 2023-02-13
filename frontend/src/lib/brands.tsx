import axios from "axios";
import { CONSTANTS } from "../types/constants";
import { Brand } from "../types/models";

interface BrandDataProps {
  data: Brand[];
}

export async function getBrands() {
  try {
    const { data }: BrandDataProps = await axios.get(
      `${CONSTANTS.URL}/products/brands`
    );

    return data;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
}

