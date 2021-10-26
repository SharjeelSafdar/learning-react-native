import React, { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StackScreenPropsType } from "../types";

const DetailsScreen: FC<StackScreenPropsType<"Details">> = ({
  navigation,
  route,
}) => {
  const props = route.params;
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(props?.itemId)}</Text>
      <Text>otherParam: {JSON.stringify(props?.otherParam)}</Text>
      <View style={{ height: 20 }} />
      <Button title="Go to Home" onPress={() => navigation.push("Home")} />
      <View style={{ height: 20 }} />
      <Button
        title="Go to Details...Push"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <View style={{ height: 20 }} />
      <Button
        title="Go Back"
        onPress={() => navigation.canGoBack() && navigation.goBack()}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Update otherParam"
        onPress={() => navigation.setParams({ otherParam: "Hello again" })}
      />
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

export default DetailsScreen;
