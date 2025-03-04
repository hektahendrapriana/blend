import ProductDetail from "../../components/ProductDetail";
import { GetStaticProps, GetStaticPaths } from "next";
import { InferGetStaticPropsType } from "next";
import { loadProductDetails, loadProducts } from "../../lib/products";
// import { mapEntriesSlugToPaths } from "../../lib/utils";

function ProductDetailPage({
  productDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <section className="section-container">
      <h2>
        Home {">"} Products{" "}
        <span className="location">
          {" "}
          {">"} {productDetails.product_name}
        </span>
      </h2>
      <ProductDetail
        id={productDetails._id}
        title={productDetails.title}
        description={productDetails.descriptions}
        photo={productDetails.photo}
        price={productDetails.price}
        info={productDetails.info}
        type={productDetails.type}
        brand={productDetails.brand}
        sku={productDetails.sku}
      />
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await loadProducts();
  // const paths = mapEntriesSlugToPaths(products);
  
  return {
    paths:
      JSON.parse(JSON.stringify(products)).docs?.map((product: any) => ({
        params: { id: `${product._id}` },
      })) || [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { id } = context.params;
  const product = await loadProductDetails(id);
  
  return {
    props: {
      productDetails: {
        id: product?._id || null,
        title: product?.product_name || null,
        description: product?.descriptions || null,
        photo: product?.product_image_url || null,
        price: product?.product_price || null,
        info: product?.product_info || null,
        type: product?.product_type || null,
        sku: product?.sku || null,
        brand: product?.brand || null,
      },
    },
  };
};

export default ProductDetailPage;
