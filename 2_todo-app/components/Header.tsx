import React, { FC } from "react";
import { HStack, Heading } from "native-base";

import { ToggleDarkMode } from "./";

const Header: FC = () => {
  return (
    <HStack
      _light={{ bg: "blue.500" }}
      _dark={{ bg: "blueGray.700" }}
      minWidth="full"
      paddingY={3}
      paddingX={3}
      justifyContent="space-between"
    >
      <Heading color="white">Home Todo</Heading>
      <ToggleDarkMode />
    </HStack>
  );
};

export default Header;
