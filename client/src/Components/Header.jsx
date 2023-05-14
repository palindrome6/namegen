
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ThemePreferenceContext } from "../App";
import { useContext } from "react";

const Header = () => {
    const { currentTheme, setCurrentTheme } = useContext(ThemePreferenceContext);
    let theme = currentTheme;
    const handleThemeChange = () => {
        theme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(theme);
    }

    return (
        <HeaderContainer theme={currentTheme}>
            <StyledHeader theme={currentTheme}>
                <div>NG</div>
                <ThemeButtonContainer theme={currentTheme}>
                    <motion.div layout className="handle">
                        <AnimatePresence mode="wait" initial={false}>
                            <ThemeButton
                                theme={currentTheme}
                                onClick={handleThemeChange}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}>
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
    transition: 1s ease-in;
    display:flex;
    align-items: center;
    justify-content: center;
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
    border: ${(props) => props.theme === 'dark' ? 'solid 1px #e6e5e2' : 'solid 1px#424242'};
    border-radius: 30px;
    height: 25px;
    transition: 1s ease-in;
    display: flex;
    justify-content: ${(props) => props.theme === 'dark' ? 'flex-end' : 'flex-start'};
`