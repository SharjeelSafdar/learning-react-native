import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { BackHandler, Button, StyleSheet, Text, View } from "react-native";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { StackScreenPropsType } from "../types";

const HomeScreen: FC<StackScreenPropsType<"Home">> = ({
  navigation,
  route,
}) => {
  const [count, setCount] = useState(0);
  const isFocused = useIsFocused();
  console.log(isFocused ? "HOME: Focused" : "HOME: Blured");
  useEffect(() => {
    console.log(route.params?.post);
  }, [route.params?.post]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Update Count" onPress={() => setCount(c => c + 1)} />
      ),
      // headerLeft: () => (
      //   <Button title="Update Count" onPress={() => setCount(c => c + 1)} />
      // ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (count < 3 && !navigation.canGoBack()) {
          setCount(c => c + 1);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [count])
  );

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Count: {count}</Text>
      <Text>Post: {JSON.stringify(route.params?.post)}</Text>
      <View style={{ height: 20 }} />
      <Button
        title="Call"
        onPress={() => Linking.openURL("tel://+92123456789")}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Google"
        onPress={() => WebBrowser.openBrowserAsync("https://google.com")}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "Hello world",
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
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Profile"
        onPress={() => navigation.navigate("Profile", { name: "Safdar" })}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Tabs Screen"
        onPress={() => navigation.navigate("TabsScreen")}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Drawer Screen"
        onPress={() => navigation.navigate("DrawerScreen")}
      />
      <View style={{ height: 20 }} />
      <Button title="Open Modal" onPress={() => navigation.navigate("Modal")} />
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

export default HomeScreen;
