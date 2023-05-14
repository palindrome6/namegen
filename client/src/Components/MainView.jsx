import SearchBar from "./SearchBar";
import NameList from "./NameList";
import styled from "styled-components";
import { forwardRef } from "react";

const MainView = forwardRef((props, ref) => {
    return (
        <StyledViewContainer ref={ref}>
            <StyledTitle>Name Generator</StyledTitle>
            <SearchBar></SearchBar>
            <NameList></NameList>
        </StyledViewContainer>
    )
});

export default MainView;


const StyledViewContainer = styled.div`
    margin-top: 230px;
    z-index: 10;
`

const StyledTitle = styled.div`
    font-size: 30px;
    margin-bottom: 40px;
`