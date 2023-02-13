import { GetStaticProps } from "next";
import Hero from "../components/Hero";
import NewsletterSection from "../components/NewsletterSection";
import PopularProducts from "../components/PopularProducts";
import ServiceSection from "../components/ServiceSection";
import { loadProducts } from "../lib/products";
import { Product } from "../types/models";

interface HomePageProps {
  products: Product[];
 
}
function HomePage(props:HomePageProps) {
  return (
    <section>
      <Hero/>
      <PopularProducts 
      products={props.products.slice(0,3)}
      />
    </section>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const items = await loadProducts();
  const products = items?.docs;
  
  return {
    props: {
      products: 
        products?.map((product: Product) => ({
          id: product._id,
          title: product.product_name || null,
          price: product.product_price || null,
          info: product.product_info || null,
          type: product.product_type || null,
          brand: product.brand || null,
          photo: product?.product_image_url
           || null,
          description: null,
          url: product?.real_pdp_url || null,
        })) || [],
    },
  };
};







export default HomePage;
