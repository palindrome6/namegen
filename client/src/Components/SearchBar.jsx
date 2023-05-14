import styled from "styled-components";
import { useContext } from 'react';
import { ThemePreferenceContext } from "../App";
const SearchBar = () => {
    const { currentTheme } = useContext(ThemePreferenceContext);
    return (
        <StyledSearchBarContainer>
            <IconContainer theme={currentTheme}>
                <input className='search-bar' type="search" placeholder="Search.."></input>
                <i className="fa fa-search"></i>
            </IconContainer>
        </StyledSearchBarContainer>
    )
}

export default SearchBar;

const StyledSearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 75px;
`

const IconContainer = styled.div`
    display: flex;
    border: ${(props) => props.theme === 'light' ? 'solid 2px #1d1d1b' : 'solid 2px white'};
    border-radius: 35px;
    padding: 10px;
    i{
        font-size: 30px;
        padding: 5px;
        color:${(props) => props.theme === 'light' ? '#1d1d1b' : 'white'};
    }
    .search-bar{
        width: 200px;
        padding: 0;
        margin: 0;
        border: 0;
        font-size: 15px;
        background-color: ${(props) => props.theme === 'light' ? '#e6e5e2' : '#424242'};
        &:focus {
            border: 0;
            outline: none;
        }
    }
`