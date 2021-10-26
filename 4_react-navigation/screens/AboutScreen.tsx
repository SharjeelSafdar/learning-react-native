import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabsScreenPropsType } from "../types";

const AboutScreen: FC<TabsScreenPropsType<"About">> = () => {
  return (
    <View style={styles.container}>
      <Text>About Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AboutScreen;
