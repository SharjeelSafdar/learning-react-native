import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { StackParamList } from "../types";

const prefix = Linking.createURL("/");

const linking: LinkingOptions<StackParamList> = {
  prefixes: [prefix],
  config: {
    initialRouteName: "Home",
    screens: {
      Home: {
        path: "",
      },
      Details: "Details",
    },
  },
};

export default linking;
