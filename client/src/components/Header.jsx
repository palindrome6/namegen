
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ThemePreferenceContext } from "../App";
import { useContext } from "react";
import logoLight from "../assets/images/logo-light.png";
import logoDark from "../assets/images/logo-dark.png";

const Header = () => {
    const { currentTheme, setCurrentTheme } = useContext(ThemePreferenceContext);
    let theme = currentTheme;
    const handleThemeChange = () => {
        theme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(theme);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        })
    }

    return (
        <HeaderContainer theme={currentTheme}>
            <StyledHeader theme={currentTheme}>
                <StyledLogo src={currentTheme === 'light' ? logoLight : logoDark}
                    initial={{ x: 50 }}
                    animate={{ x: 0 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    onClick={scrollToTop}
                >
                </StyledLogo>
                <ThemeButtonContainer theme={currentTheme}>
                    <motion.div layout className="handle">
                        <AnimatePresence mode="wait" initial={false}>
                            <ThemeButton
                                theme={currentTheme}
                                onClick={handleThemeChange}>
                                <motion.i
                                    initial={{ y: -30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 30, opacity: 0 }}
                                    transition={{ duration: .2 }} className={`fa fa-${currentTheme === 'light' ? 'moon' : 'sun'}`} aria-hidden="true"></motion.i>

                            </ThemeButton>
                        </AnimatePresence>
                    </motion.div>
                </ThemeButtonContainer>
            </StyledHeader>
        </HeaderContainer>
    )
}
export default Header;

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-size: 30px;
    color: ${(props) => props.theme === 'light' ? '#1d1d1b' : 'white'};
    overflow: hidden;
    height: 50px;
    z-index: 1000;
`

const ThemeButton = styled(motion.div)`
    font-size: 16px;
    background: ${(props) => props.theme === 'dark' ? '#e6e5e2' : '#424242'};
    width: 20px;
    height: 20px;
    border-radius: 20px;
    color: ${(props) => props.theme === 'light' ? 'white' : '#1d1d1b'};
    cursor: pointer;
    z-index: 1000;
    margin: 2px;
    transition: 0.5s ease-in;
    display:flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;
    &:hover{
        scale: 1.2;
    }
`

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${(props) => props.theme === 'light' ? '#e6e5e2' : '#424242'};
`

const ThemeButtonContainer = styled.div`
    width: 50px;
    background-color: ${(props) => props.theme === 'light' ? '#e6e5e2' : '#424242'};
    border: ${(props) => props.theme === 'dark' ? 'solid 2px #e6e5e2' : 'solid 2px#424242'};
    border-radius: 30px;
    height: 25px;
    transition: 1s ease-in;
    display: flex;
    justify-content: ${(props) => props.theme === 'dark' ? 'flex-end' : 'flex-start'};
`

const StyledLogo = styled(motion.img)`
    padding-left: 10px;
    cursor: pointer;
`