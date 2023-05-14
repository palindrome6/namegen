import styled from "styled-components";
import { useContext, useState } from 'react';
import { ThemePreferenceContext } from "../App";
import { setNameList } from "../services/nameList";
import { ValidationHelper } from '../common/ValidationHelper';

const SearchBar = () => {
    const [displayError, setDisplayError] = useState(false);
    const { currentTheme } = useContext(ThemePreferenceContext);

    const handleOnChange = async (event) => {
        const value = event.target.value;
        const hasNumber = /\d/;
        setDisplayError(false);
        if (ValidationHelper.isNotUndefinedOrNull(value) && ValidationHelper.isNotEmptyString(value) && (hasNumber.test(value) === false)) {
            setNameList(value);
        } else if ((value !== null && value !== undefined && value !== '')) {
            setDisplayError(true);
        }
    }

    return (
        <StyledSearchBarContainer>
            <IconContainer theme={currentTheme}>
                <input className='search-bar' type="text" placeholder="Search.." onChange={handleOnChange}></input>
                <i className="fa fa-search"></i>
            </IconContainer>
            {displayError === true && <ErrorContainer>Please enter valid string!</ErrorContainer>}
        </StyledSearchBarContainer>
    )
}

export default SearchBar;

const StyledSearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    pointer-events: all;
`

const IconContainer = styled.div`
    display: flex;
    border: ${(props) => props.theme === 'light' ? 'solid 2px #1d1d1b' : 'solid 2px #e6e5e2'};
    border-radius: 35px;
    padding: 10px;
    i{
        font-size: 30px;
        padding: 5px;
        color:${(props) => props.theme === 'light' ? '#1d1d1b' : '#e6e5e2'};
    }
    .search-bar{
        width: 200px;
        padding: 0;
        margin: 0;
        border: 0;
        font-size: 20px;
        color:${(props) => props.theme === 'light' ? '#1d1d1b' : '#e6e5e2'};
        background-color: ${(props) => props.theme === 'light' ? '#e6e5e2' : '#424242'};
        &:focus {
            border: 0;
            outline: none;
        }
    }
`

const ErrorContainer = styled.div`
    padding-top: 25px;
    color:${(props) => props.theme === 'light' ? '#1d1d1b' : '#e6e5e2'};
`