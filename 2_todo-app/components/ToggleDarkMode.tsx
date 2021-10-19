import React from "react";
import { Text, HStack, Switch, useColorMode } from "native-base";

// Color Switch Component
const ToggleDarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text color="white">Dark</Text>
      <Switch
        offTrackColor="dark.100"
        offThumbColor="dark.500"
        onTrackColor="dark.500"
        onThumbColor="dark.300"
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text color="white">Light</Text>
    </HStack>
  );
};

export default ToggleDarkMode;
