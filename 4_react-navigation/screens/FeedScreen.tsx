import React, { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TabsScreenPropsType } from "../types";

const FeedScreen: FC<TabsScreenPropsType<"Feed">> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Feed Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <View style={{ height: 20 }} />
      <Button title="About" onPress={() => navigation.navigate("About")} />
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

export default FeedScreen;
