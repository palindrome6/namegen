import { motion } from "framer-motion";
import styled from "styled-components";
import { useContext } from 'react';
import { ThemePreferenceContext } from "../App";

const Title = ({ mainViewRef }) => {
    const { currentTheme } = useContext(ThemePreferenceContext);
    const scrollToMainView = () => {
        mainViewRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
    return (
        <StyledTitleContainer theme={currentTheme}>
            <StyledTitle>Naamify</StyledTitle>
            <StyledText>Generate unique baby names!</StyledText>
            <StyledButton theme={currentTheme} onClick={scrollToMainView} whileHover={{ scale: 1.1 }} transition={{ duration: 0.5, ease: "easeInOut" }}>Get Started</StyledButton>
        </StyledTitleContainer>
    )
}

export default Title;

const StyledTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${(props) => props.theme === 'light' ? '#1d1d1b' : '#e6e5e2'};
    height: 100vh;
    opacity: 0.8;
    pointer-events: none;
`

const StyledTitle = styled.div`
    font-size: 60px;
`

const StyledText = styled.div`
    margin-top: 10px;
    font-size: 30px;
`

const StyledButton = styled(motion.button)`
    background-color: ${(props) => props.theme === 'light' ? '#1d1d1b' : '#e6e5e2'};
    margin-top: 40px;
    color: ${(props) => props.theme === 'dark' ? '#1d1d1b' : '#e6e5e2'};
    width: 200px;
    height: 60px;
    border-radius: 40px;
    font-size: 20px;
    cursor: pointer !important;
    border: ${(props) => props.theme === 'light' ? 'solid 2px #1d1d1b' : 'solid 2px #e6e5e2'};
    z-index: 10000;
    pointer-events: all;
    &:focus{
        outline: 0;
    }
`