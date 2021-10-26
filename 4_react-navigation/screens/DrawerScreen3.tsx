import React, { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { DrawerScreenPropsType } from "../types";

const DrawerScreen3: FC<DrawerScreenPropsType<"DrawerScreen3">> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text>Drawer Screen 3</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
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

export default DrawerScreen3;
