import React from "react";
import { NativeBaseProvider, extendTheme, Container } from "native-base";
import Amplify from "aws-amplify";
import awsConfig from "./aws-exports";
const { withAuthenticator } = require("aws-amplify-react-native");

import { Header, TodosList } from "./components";

Amplify.configure(awsConfig);

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

function App() {
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

export default withAuthenticator(App);
