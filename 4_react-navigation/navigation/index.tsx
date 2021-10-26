import React, { FC } from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { StackParamList, BottomTabsParamList, DrawerParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import {
  HomeScreen,
  DetailsScreen,
  CreatePostScreen,
  ProfileScreen,
  ModalScreen,
  FeedScreen,
  MessagesScreen,
  AboutScreen,
  DrawerScreen1,
  DrawerScreen2,
  DrawerScreen3,
} from "../screens";

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<BottomTabsParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            // headerTitle: props => <LogoTitle />,
            headerRight: () => (
              <Button
                title="Info"
                color="#f4511e"
                onPress={() => alert("This is a button!")}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ otherParam: "Sharjeel" }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{ title: "Create Post" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({
            title: route.params?.name,
          })}
        />
        <Stack.Screen
          name="TabsScreen"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerScreen"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animation: "slide_from_right",
          headerShown: false,
        }}
      >
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const TabsNavigator: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:
            | "logo-flickr"
            | "chatbox-ellipses"
            | "information-circle-sharp";
          iconName =
            route.name === "Feed"
              ? "logo-flickr"
              : route.name === "Messages"
              ? "chatbox-ellipses"
              : "information-circle-sharp";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ headerShown: false, tabBarBadge: 3 }}
      />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
};

const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator initialRouteName="DrawerScreen1">
      <Drawer.Screen
        name="DrawerScreen1"
        component={DrawerScreen1}
        options={{ title: "Drawer Screen 1" }}
      />
      <Drawer.Screen
        name="DrawerScreen2"
        component={DrawerScreen2}
        options={{ title: "Drawer Screen 2" }}
      />
      <Drawer.Screen
        name="DrawerScreen3"
        component={DrawerScreen3}
        options={{ title: "Drawer Screen 3" }}
      />
    </Drawer.Navigator>
  );
};
