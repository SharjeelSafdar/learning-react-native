import React, { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDrawerStatus } from "@react-navigation/drawer";
import { DrawerScreenPropsType } from "../types";

const DrawerScreen1: FC<DrawerScreenPropsType<"DrawerScreen1">> = ({
  navigation,
}) => {
  const drawerStatus = useDrawerStatus();
  console.log({ drawerStatus });

  return (
    <View style={styles.container}>
      <Text>Drawer Screen 1</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <View style={{ height: 20 }} />
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <View style={{ height: 20 }} />
      <Button title="Close Drawer" onPress={() => navigation.closeDrawer()} />
      <View style={{ height: 20 }} />
      <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} />
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

export default DrawerScreen1;
