import SearchBar from "./SearchBar";
import NameList from "./NameList";
import styled from "styled-components";
import { forwardRef } from "react";
import { useContext } from 'react';
import { ThemePreferenceContext } from "../App";

const MainView = forwardRef((props, ref) => {
    const { currentTheme } = useContext(ThemePreferenceContext);
    return (
        <StyledViewContainer ref={ref}>
            <StyledTitle theme={currentTheme}>Name Generator</StyledTitle>
            <SearchBar></SearchBar>
            <NameList></NameList>
        </StyledViewContainer>
    )
});

export default MainView;


const StyledViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100vh;
    pointer-events: none;
`

const StyledTitle = styled.div`
    font-size: 30px;
    margin-bottom: 40px;
    color: ${(props) => props.theme === 'dark' ? '#e6e5e2' : '#424242'};
`