import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getImageUrl } from "../../lib/utils";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';


const CustomIcon = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "3rem",
  height: "3rem",
  borderRadius: "50%",
  transition: "all 0.3s linear",
  opacity: 0,
  cursor: "pointer",
  "&:hover ": {
    background: theme.palette.primary.main,
  },
}));

const CustomContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: "#222",
  borderRadius: "0.25rem",
  "&:hover img": {
    opacity: 0.5,
    cursor: "pointer",
  },
  "&:hover button": {
    opacity: 1,
  },
}));

export interface ProductItemProps {
  _id: number;
  photos: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  info: string;
  sku: string;
  type: string;
  url?: any;
}

function ProductItem(props: ProductItemProps) {
  const { _id, photos, title,price, brand, info, sku, type} = props;
  const router = useRouter();

  function showDetailsHandler() {
    router.push("/products/" + _id);
  }
  
  const handleImageError = (e:any) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/400x150?text=no+image+available"  
}

const numberFormat = (value:number) =>
  new Intl.NumberFormat('id-ID', {
}).format(value);

const currencyFormat = (value:number) =>
    new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
}).format(value);


  return (
    <div className="item">
      <Card>
        <CustomContainer>
          <CardMedia
            component="img"
            image={photos}
            onError={handleImageError}
            sx={{ transition: "all 0.3s linear" }}
            
          />
          <CustomIcon onClick={showDetailsHandler}>
            <ZoomInOutlinedIcon
              sx={{
                color: "white",
                fontSize: "40px",
              }}
            />
          </CustomIcon>
        </CustomContainer>
        <CardContent sx={{ height:'87px' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography sx={{ fontSize: 14 }} gutterBottom component="div" className="product-title">
              {title}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom component="div" className="product-price">
              {currencyFormat(price)}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductItem;
