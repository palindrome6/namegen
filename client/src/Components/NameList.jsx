import styled from "styled-components";
import { getNameList } from "../services/nameList";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemePreferenceContext } from "../App";
import { useContext } from "react";

const NameList = ({ nameList }) => {
    const { currentTheme } = useContext(ThemePreferenceContext);
    console.log(nameList)
    return (
        <StyledListContainer theme={currentTheme}>
            {
                nameList !== null && nameList !== undefined && nameList !== [] &&
                nameList.map((name, index) => {
                    return (
                        <StyledName key={`${name}-id-${index}`}
                            theme={currentTheme}
                            whileHover={{ scale: 0.9 }}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 0.7, scale: 0.8 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            {name}
                        </StyledName>
                    )
                })
            }
        </StyledListContainer>
    )
}

export default NameList;

const StyledListContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    flex-wrap: wrap;
`

const StyledName = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${(props) => props.theme === 'light' ? 'solid 1px #1d1d1b' : 'solid 1px white'};
    border-radius: 10px;
    /* box-shadow: 2px 2px 2px #1d1d1b; */
    width: 200px;
    height: 30px;
    padding: 10px;
    margin: 10px; 
    cursor: pointer;
    color: ${(props) => props.theme === 'light' ? '#1d1d1b' : 'white'};
    font-size: 20px;
    font-weight: 600;
    pointer-events: all;
`