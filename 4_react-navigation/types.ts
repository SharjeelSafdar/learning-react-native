import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

export type StackParamList = {
  Home?: {
    post: string;
  };
  Details?: {
    itemId?: number;
    otherParam?: string;
  };
  CreatePost?: undefined;
  Profile?: {
    name: string;
  };
  TabsScreen?: NavigatorScreenParams<BottomTabsParamList>;
  DrawerScreen?: NavigatorScreenParams<DrawerParamList>;
  Modal?: undefined;
};

export type BottomTabsParamList = {
  Feed?: undefined;
  Messages?: undefined;
  About?: undefined;
};

export type DrawerParamList = {
  DrawerScreen1?: undefined;
  DrawerScreen2?: undefined;
  DrawerScreen3?: undefined;
};

export type StackScreenPropsType<T extends keyof StackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<StackParamList, T>,
    CompositeScreenProps<
      BottomTabScreenProps<BottomTabsParamList>,
      DrawerScreenProps<DrawerParamList>
    >
  >;

export type TabsScreenPropsType<T extends keyof BottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, T>,
    NativeStackScreenProps<StackParamList>
  >;

export type DrawerScreenPropsType<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    NativeStackScreenProps<StackParamList>
  >;
