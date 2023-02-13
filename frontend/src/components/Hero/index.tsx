import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HeroCarousel from "../HeroCarousel";
import { styled } from '@mui/material/styles';
import MainButton from "../MainButton";
import Link from "next/link";



const CustomText = styled(Typography)(({ theme }) => ({
    color: theme.palette.info.light
}));

function Hero(props: any) {
    return (
        <Box sx={{ marginTop:10,flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Box>
                        <HeroCarousel />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Hero;