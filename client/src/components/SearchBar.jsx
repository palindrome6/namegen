import styled from "styled-components";
import { useContext, useState } from 'react';
import { ThemePreferenceContext } from "../App";
import { getNameList } from "../services/nameList";
import { ValidationHelper } from '../common/ValidationHelper';
import NameList from "./NameList";

const SearchBar = () => {
    const [displayError, setDisplayError] = useState(false);
    const [nameList, setNameList] = useState([]);
    const { currentTheme } = useContext(ThemePreferenceContext);

    const handleOnChange = async (event) => {
        event.preventDefault();
        const value = event.target.value;
        const hasNumber = /\d/;
        setDisplayError(false);
        if (ValidationHelper.isNotUndefinedOrNull(value) && ValidationHelper.isNotEmptyString(value) && (hasNumber.test(value) === false)) {
            const nameListResponse = await getNameList(value);
            console.log(nameListResponse)
            if (ValidationHelper.isNotUndefinedOrNull(nameListResponse) && ValidationHelper.isNotEmptyString(nameListResponse)) {
                let nameList = nameListResponse.split(',');
                setNameList(nameList);
            }
        } else if ((value !== null && value !== undefined && value !== '')) {
            setDisplayError(true);
        } else {
            setNameList([]);
        }
    }

    return (
        <>
            <StyledSearchBarContainer>
                <IconContainer theme={currentTheme}>
                    <input className='search-bar' type="text" placeholder="Search.." onChange={handleOnChange}></input>
                    <i className="fa fa-search"></i>
                </IconContainer>
                {displayError === true && <ErrorContainer theme={currentTheme}>Please enter valid string!</ErrorContainer>}
            </StyledSearchBarContainer>
            <NameList nameList={nameList}></NameList>
        </>
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
        font-weight: 600;
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