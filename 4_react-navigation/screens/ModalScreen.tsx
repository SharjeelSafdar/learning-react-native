import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Button } from "react-native";
import { StackScreenPropsType } from "../types";

const ModalScreen: FC<StackScreenPropsType<"Modal">> = ({ navigation }) => {
  return (
    <SafeAreaView
      style={[styles.container, { borderColor: "#f4511e", borderWidth: 3 }]}
    >
      <Text>Modal Screen</Text>
      <Button title="Close Modal" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ModalScreen;
