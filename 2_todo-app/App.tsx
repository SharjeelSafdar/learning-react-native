import React from "react";
import { NativeBaseProvider, extendTheme, Container } from "native-base";

import { Header, TodosList } from "./components";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Container
        minWidth="full"
        minHeight="full"
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
      >
        <Header />
        <TodosList />
      </Container>
    </NativeBaseProvider>
  );
}
