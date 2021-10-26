import React, { FC } from "react";
import { Button, StyleSheet, View } from "react-native";
import { StackScreenPropsType } from "../types";

const ProfileScreen: FC<StackScreenPropsType<"Profile">> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.navigate("Home")} />
      <View style={{ height: 20 }} />
      <Button
        title="Update Title"
        onPress={() => navigation.setOptions({ title: "Updated!" })}
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

export default ProfileScreen;
