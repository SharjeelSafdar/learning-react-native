import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabsScreenPropsType } from "../types";

const MessagesScreen: FC<TabsScreenPropsType<"Messages">> = () => {
  return (
    <View style={[styles.container, { backgroundColor: "#6a51ae" }]}>
      <Text style={{ color: "white" }}>Messages Screen</Text>
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

export default MessagesScreen;
