import React, { useState, useEffect } from "react";
import ProductList from "../../components/ProductList";
import { GetStaticProps, GetStaticPaths } from "next";
import { InferGetStaticPropsType } from "next";
import { loadProducts } from "../../lib/products";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import MainButton from "../../components/MainButton";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListProductsView from "../../components/ListProductsView";
import SearchBar from "../../components/SearchBar";
import Categories from "../../components/Categories";
import Companies from "../../components/Companies";
import Sort from "../../components/Sort";
import { SelectChangeEvent } from "@mui/material";
import { getCategories } from "../../lib/categories";
import { getBrands } from "../../lib/brands";
import { Category } from "../../types/models";
import { Brand } from "../../types/models";
import { number } from "yup";


const categoryAll: Category = {
  id: "",
  label: "",
  title: "",
  value: "",
  category: "",
};

const brandAll: Brand = {
  id: "",
  label: "",
  title: "",
  value: "",
  brand: "",
};


function ProductsPage({
  products,
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const maxPrice = Math.max.apply(
    Math,
    products.map(function (o: any) {

      return o.price;
    })
  );
  const minPrice = Math.min.apply(
    Math,

    products.map(function (o: any) {

      return o.price;
    })
  );

  const [company, setCompany] = useState<string>("");
  const [price, setPrice] = useState<number>(maxPrice);
  const [sortCondition, setSortCondition] = useState<string>("");
  const [isListView, setListView] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoriesList, setCategoriesList] = useState<Category[]>(categories);
  const [categoryId, setCategoryId] = useState<string>('');
  const [brandsList, setBrandsList] = useState<Brand[]>(brands);
  const [brandId, setBrandId] = useState<string>('');
  const [productList, setProductList] = useState(products)

  const handleSliderChange = (event: any, newValue: any) => {
    setPrice(newValue);
    setProductList(products.filter((product: any) => product.price <= newValue))
  };

  const handleBrandChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value
    console.log('value', value)
    setBrandId(value);
    setProductList(value === '' ? products : products.filter((product: any) => product.brand === value))
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value
    console.log('value', value)
    setCategoryId(value);
    setProductList(value === '' ? products : products.filter((product: any) => product.type === value))
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortCondition(event.target.value);
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    setProductList(products.filter((product: any) => product.title.toLocaleLowerCase()
      .includes(event.target.value.toLocaleLowerCase())))
  };

  const handleListView = () => {
    setListView(true);
  };

  const handleGridView = () => {
    setListView(false);
  };

  const clearFiltersHandler = () => {
    setPrice(maxPrice);
    setSortCondition("");
    setSearchTerm("");
    setCategoryId('');
    setBrandId('');
    setProductList(products)
  };

  return (
    <section className="section-container">
      <h2>
        Home <span className="location"> {">"} Products</span>
      </h2>
      <Box sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <SearchBar
              onChange={handleSearchChange}
            />
            <h4>Category</h4>
            <Categories
              onChange={handleCategoryChange}
              categoriesList={categoriesList}
              selectedCategory={categoryId}
            />
            <h4>Company</h4>
            <Companies
              onChange={handleBrandChange}
              brandsList={brandsList}
              selectedBrand={brandId}
            />
            {/* <Companies onChange={handleBrandChange} value={company} /> */}
            {/* <h4>Price</h4>
            <p style={{ color: "#0056ad" }}>$ {price},00</p>
            <Box sx={{ width: 180 }}>
              <Slider
                value={price}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                min={minPrice}
                max={maxPrice}
                step={100}
              />
            </Box> */}
            <Box sx={{ marginTop: 20 }} className="btn-clear">
              <MainButton onClick={clearFiltersHandler}>
                CLEAR FILTERS
              </MainButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                width: "100%",
                marginLeft: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <GridViewIcon
                style={{ marginRight: "0.5rem", cursor: "pointer" }}
                onClick={handleGridView}
              />
              <FormatListBulletedIcon
                style={{ marginRight: "0.5rem", cursor: "pointer" }}
                onClick={handleListView}
              />
              <p style={{ marginRight: "0.5rem" }}>
                {productList.length} products found
              </p>
              <div
                style={{
                  height: "3px",
                  width: "42%",
                  backgroundColor: "#0057D8",
                  marginRight: "0.5rem",
                }}
              ></div>
              <p style={{ marginRight: "0.5rem" }}>Sort By</p>
              <Sort onChange={handleSortChange} value={sortCondition} />
            </Box>
            <div id="products">
              {productList.length === 0 ? <p>Nothing was found</p> : !isListView ? (
                <ProductList
                  searchTerm={searchTerm}
                  price={price}
                  categoryId={categoryId}
                  brandId={brandId}
                  type={categoryId}
                  products={
                    sortCondition === "high-price"
                      ? products.sort(function (a: any, b: any) {
                        return b.price - a.price;
                      })
                      : products.sort(function (a: any, b: any) {
                        return a.price - b.price;
                      })
                  }
                />
              ) : (
                <ListProductsView
                  searchTerm={searchTerm}
                  price={price}
                  categoryId={categoryId}
                  products={
                    sortCondition === "high-price"
                      ? products.sort(function (a: any, b: any) {
                        return b.price - a.price;
                      })
                      : products.sort(function (a: any, b: any) {
                        return a.price - b.price;
                      })
                  }
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Box>

    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  
  const items = await loadProducts();
  const products = await items?.docs;
  const categories = await getCategories();
  const brands = await getBrands();
  console.log('brands', brands)
  
  return {
    props: {

      products: products?.map((product: any) => ({
        _id: product._id,
        sku: product.sku || null,
        title: product.product_name || null,
        price: product.product_price || null,
        info: product?.product_info || null,
        type: product.product_type || null,
        brand: product.brand || null,
        photo: product?.product_image_url
          || null,
        description: null,
        url: product?.real_pdp_url || null,
      })) || [],
      categories:
        categories?.map((category: Category) => ({
          id: category?.id || null,
          label: category?.label || null,
          value: category?.value || null,
          category: category?.category || null,
          title: category?.title || null,
        })) || [],
      brands:
        brands?.map((brand: Brand) => ({
          id: brand?.id || null,
          label: brand?.label || null,
          value: brand?.value || null,
          brand: brand?.brand || null,
          title: brand?.title || null,
        })) || [],
    },
  };
};

export default ProductsPage;


