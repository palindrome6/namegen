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
            <StyledText>Generate unique sanskrit names! </StyledText>
            <StyledButton onClick={scrollToMainView} whileHover={{ scale: 1.1 }} transition={{ duration: 0.5, ease: "easeInOut" }}>Get Started</StyledButton>
        </StyledTitleContainer>
    )
}

export default Title;

const StyledTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${(props) => props.theme === 'light' ? '#1d1d1b' : 'white'};
    height: 100vh;
`

const StyledTitle = styled.div`
    font-size: 60px;
`

const StyledText = styled.div`
    margin-top: 10px;
    font-size: 30px;
`

const StyledButton = styled(motion.button)`
    background-color: #1d1d1b;
    margin-top: 40px;
    color: white;
    width: 200px;
    height: 60px;
    border-radius: 40px;
    font-size: 20px;
    cursor: pointer !important;
    border: solid 2px #1d1d1b;
    z-index: 10000;
    &:focus{
        outline: 0;
    }
`