import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import styled, { ThemeProvider } from 'styled-components';
import Title from './components/Title';
import MainView from './components/MainView';
import background from './assets/images/background.jpg';
export const light = {
  primary: '#4851f4',
  background: '#e6e5e2',
  nav: '#f8f8f8',
  border: '#deebf1',
  text: '#202224'
}
export const dark = {
  primary: '#4851f4',
  background: '#424242',
  nav: '#27282b',
  border: '#303236',
  text: '#f8f8f8'
}
const themesMap = {
  light,
  dark
}

export const ThemePreferenceContext = React.createContext()
function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const theme = { colors: themesMap[currentTheme] };
  const mainViewRef = React.createRef();
  return (
    <StyledAppContainer className="App" currentTheme={currentTheme}>
      <ThemePreferenceContext.Provider value={{ currentTheme, setCurrentTheme }}>
        <ThemeProvider theme={theme}>
          <Header />
          <Content>
            <BackgroundImage src={background}></BackgroundImage>
            <Title mainViewRef={mainViewRef}></Title>
            <MainView ref={mainViewRef}></MainView>
          </Content>
        </ThemeProvider>
      </ThemePreferenceContext.Provider>
    </StyledAppContainer>
  );
}

export default App;

const StyledAppContainer = styled.div`
  background: ${(props) => themesMap[props.currentTheme].background};
`
const Content = styled.div`
  overflow: auto;
`

const BackgroundImage = styled.img`
  position: absolute;
  bottom: 0;
  left:0;
  right: 0;
  width: 100%;
  top: 0;
  height: 100%;
  mix-blend-mode: color;
  background-position: 0 0;
  background-attachment: fixed;
  overflow: hidden;
  pointer-events: none;
  z-index: 99;
`