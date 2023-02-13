import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import MainButton from "../MainButton";
import Link from "next/link";
import ProductImages from "../ProductImages";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/material";
import AddToCart from "../AddToCart";

const CustomText = styled('div')(({ theme }) => ({
  color: theme.palette.info.light
}));

interface ProductDetailProps {
  id: number;
  price: string;
  photo: string;
  title: string;
  brand: string;
  info: string;
  sku: string;
  type: string;
  description: string;
}

function ProductDetail(props: ProductDetailProps) {
  const { photo, title, price, description, brand, info, type, sku } = props;
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  

  const numberFormat = (value:any) =>
  new Intl.NumberFormat('id-ID', {
  }).format(value);

  const currencyFormat = (value:any) =>
    new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value);
  
  return (
    <section className="product-details">
      <Box sx={{ marginTop: 7 }}>
        <Link href="/products" passHref className="btn-back">
          <MainButton>BACK TO PRODUCTS</MainButton>
        </Link>
      </Box>
      <Box sx={{ marginTop: 5, flexGrow: 1 }} className="box-details">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
            <Box>
              <ProductImages images={photo} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sm={12} >
            <Box sx={{ paddingLeft: { md: '30px', xs: '10px' }, marginLeft: { xs: '20%', sm: '30%', md: 0 } }}>
              <Box sx={{ marginTop: { xs: 5, sm: 5, md: 0 } }}  >
                <Typography component="div" variant='h4'>
                  <Box sx={{fontFamily: "Verdana, Geneva, Tahoma, sans-serif", fontSize: 20}}>{title}</Box>
                </Typography>
              </Box>
              <Typography
                sx={{ fontSize: 25, marginTop: 3, color: "#003E7D", fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
                component="div"
              >
                {currencyFormat(price)}
              </Typography>
              <CustomText >
                <Box sx={{ marginTop: 3, fontWeight: '300', fontSize: 20, textAlign: 'justify' }}>
                  {description}
                </Box>
              </CustomText>
              <Box sx={{ marginTop: 3 }}>
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Typography
                    sx={{ fontSize: 18, fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
                    gutterBottom
                    component="div"
                  >
                    Sku:
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
                    gutterBottom
                    component="div"
                  >
                    {sku}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Typography
                    sx={{ fontSize: 18, fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
                    gutterBottom
                    component="div"
                  >
                    Brand:
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
                    gutterBottom
                    component="div"
                  >
                    {brand}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Typography
                    sx={{ fontSize: 18, fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
                    gutterBottom
                    component="div"
                  >
                    Available:
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
                    gutterBottom
                    component="div"
                  >
                    {info === 'Stok Habis' ? 'Stok Habis' : 'Stok Tersedia'}
                  </Typography>
                </Stack>
              </Box>
              
              {info === 'Stok Habis' ? 
                '' 
                : 
                <AddToCart id={props.id} />
              }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
}

export default ProductDetail;
