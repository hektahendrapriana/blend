import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        title: 'AirPods Gen 2',
        label: 'Selengkapnya',
        url: 'https://ibox.co.id/catalog/aksesoris/airpods-2201?utm_source=web&utm_medium=slider_banner&utm_campaign=airpods_gen_2',
        imgPath:
            'http://localhost:8080/uploads/banner1.jpg',
    },
    {
        title: 'Beralih ke Mac',
        label: 'Selengkapnya',
        url: 'https://ibox.co.id/page/beralih-ke-mac?utm_source=web&utm_medium=slider_banner&utm_campaign=beralih_ke_mac',
        imgPath:
            'http://localhost:8080/uploads/banner2.jpg',
    },
    {
        title: 'The fit Squad',
        label: 'Selengkapnya',
        url: 'https://ibox.co.id/page/the-fit-squad?utm_source=web&utm_medium=slider_banner&utm_campaign=the_fit_squad',
        imgPath:
            'http://localhost:8080/uploads/banner3.jpg',
    },
    {
        title: 'Iphone 14',
        label: 'Selengkapnya',
        url: 'https://ibox.co.id/catalog/iphone/iphone-14-5350?utm_source=web&utm_medium=slider_banner&utm_campaign=iphone_14_lp',
        imgPath:
            'http://localhost:8080/uploads/banner4.jpg',
    },
    {
        title: 'Iphone 13',
        label: 'Selengkapnya',
        url: 'https://ibox.co.id/catalog/iphone-13-4381?utm_source=web&utm_medium=slider_banner&utm_campaign=iphone_13',
        imgPath:
            'http://localhost:8080/uploads/banner5.jpg',
    },
    {
        title: 'Ipad gen 9',
        label: 'Selengkapnya',
        url: 'https://ibox.co.id/catalog/ipad/ipad-generasi-9-4374?utm_source=web&utm_medium=slider_banner&utm_campaign=ipad_gen9_selengkapnya',
        imgPath:
            'http://localhost:8080/uploads/banner6.jpg',
    },
    {
        title: 'Apple Watch Series 8',
        label: 'Selengkapnya',
        url: 'https://ibox.co.id/catalog/watch/apple-watch-series-8-5417?utm_source=web&utm_medium=slider_banner&utm_campaign=apple_watch_series-8_lp',
        imgPath:
            'http://localhost:8080/uploads/banner7.jpg',
    }
];

function HeroCarousel() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{
            flexGrow: 1,
            width: "100%",
            marginBottom: '50px'
        }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.title}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    display: 'block',
                                    borderStyle: 'none',
                                    borderColor: 'transparent',
                                    borderWidth: 'thin',
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step.imgPath}
                                alt={step.title}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
            sx={{
                bgcolor: '#f1f5f8',
            }}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        className="btn-next"
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        className="btn-prev" 
                        size="small" 
                        onClick={handleBack} 
                        disabled={activeStep === 0}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                    </Button>
                }
            />
        </Box>
    );
}

export default HeroCarousel;
