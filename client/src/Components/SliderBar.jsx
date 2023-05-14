import React from "react";
import Slider from '@mui/material/Slider';
import styled from "styled-components";
import { styled as StyledComponent } from '@mui/material/styles';
import { useContext } from 'react';
import { ThemePreferenceContext } from "../App";

const SliderBar = () => {
    const { currentTheme } = useContext(ThemePreferenceContext);
    const marks = [
        {
            value: 0,
            label: 'Normal',
        },
        {
            value: 50,
            label: 'Medium',
        },
        {
            value: 100,
            label: 'Adventurous',
        }
    ];
    return (
        <StyledSliderContainer>
            <PrettoSlider
                theme={currentTheme}
                step={null}
                marks={marks}>
            </PrettoSlider>
        </StyledSliderContainer>

    )
}

export default SliderBar;

const StyledSliderContainer = styled.div`
    /* position: absolute;
    top: 50%; */
`

const PrettoSlider = StyledComponent(Slider)({
    color: `#1d1d1b`,
    height: 8,
    width: 400,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});
