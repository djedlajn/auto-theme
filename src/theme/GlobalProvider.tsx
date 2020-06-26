import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyle } from "./GlobalStyle";

interface GlobalContext {
  dark: boolean;
  changeTheme: () => void;
}

export const GlobalContext = createContext<GlobalContext | null>(null);

const GlobalProvider: React.FC = (props) => {
  const darkDefault: boolean = window.matchMedia(
    "(prefers-color-scheme : dark)"
  )
    ? true
    : false;

  const [dark, setTheme] = useState<boolean>(darkDefault);

  return (
    <GlobalContext.Provider
      value={{ dark, changeTheme: (): void => setTheme(!dark) }}
    >
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <GlobalStyle />
        {props.children}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
