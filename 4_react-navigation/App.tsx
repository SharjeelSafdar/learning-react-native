import "react-native-gesture-handler";
import React, {
  FC,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  BackHandler,
  Alert,
} from "react-native";
import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerScreenProps,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabsParamList>();
const Drawer = createDrawerNavigator<DrawersParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
              component={TabsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DrawerScreen"
              component={DrawerScreen}
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
        <StatusBar style="inverted" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

type RootStackParamList = StackNavigatorParamList &
  BottomTabsParamList &
  DrawersParamList;

type StackNavigatorParamList = {
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
  TabsScreen?: undefined;
  DrawerScreen?: undefined;
  Modal?: undefined;
};

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50, tintColor: "#fff" }}
      source={{ uri: "./assets/logo.png" }}
    />
  );
}

const ModalScreen: FC<NativeStackScreenProps<RootStackParamList, "Modal">> = ({
  navigation,
}) => {
  return (
    <SafeAreaView
      style={[styles.container, { borderColor: "#f4511e", borderWidth: 3 }]}
    >
      <Text>Modal Screen</Text>
      <Button title="Close Modal" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

const HomeScreen: FC<NativeStackScreenProps<RootStackParamList, "Home">> = ({
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

const DetailsScreen: FC<NativeStackScreenProps<RootStackParamList, "Details">> =
  ({ navigation, route }) => {
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

const CreatePostScreen: FC<
  NativeStackScreenProps<RootStackParamList, "CreatePost">
> = ({ navigation }) => {
  const [postText, setPostText] = useState("");
  const hasUnsavedChanges = Boolean(postText);

  useFocusEffect(() => {
    console.log("CREATE_POST: Focused");
  });

  useEffect(() => {
    navigation.addListener("beforeRemove", e => {
      if (!hasUnsavedChanges) {
        return;
      }
      const payload = e.data.action.payload as any;
      if (
        payload &&
        payload.name === "Home" &&
        payload.params.post === postText
      ) {
        return;
      }

      e.preventDefault();

      Alert.alert(
        "Discard Changes?",
        "You have unsaved changes. Are you sure to discard them and leave the screen?",
        [
          {
            text: "Don't leave",
            style: "cancel",
            onPress: () => {},
          },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
  }, [navigation, hasUnsavedChanges]);

  return (
    <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Done"
        onPress={() => {
          navigation.navigate({
            name: "Home",
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </View>
  );
};

const ProfileScreen: FC<NativeStackScreenProps<RootStackParamList, "Profile">> =
  ({ navigation }) => {
    return (
      <View>
        <Button title="Back" onPress={() => navigation.navigate("Home")} />
        <View style={{ height: 20 }} />
        <Button
          title="Update Title"
          onPress={() => navigation.setOptions({ title: "Updated!" })}
        />
      </View>
    );
  };

type BottomTabsParamList = {
  Feed?: undefined;
  Messages?: undefined;
  About?: undefined;
};

const TabsScreen: FC<NativeStackScreenProps<RootStackParamList, "TabsScreen">> =
  () => {
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

const FeedScreen: FC<BottomTabScreenProps<RootStackParamList, "Feed">> = ({
  navigation,
}) => {
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

const MessagesScreen: FC<BottomTabScreenProps<RootStackParamList, "Messages">> =
  () => {
    return (
      <View style={[styles.container, { backgroundColor: "#6a51ae" }]}>
        <Text style={{ color: "white" }}>Messages Screen</Text>
      </View>
    );
  };

const AboutScreen: FC<BottomTabScreenProps<RootStackParamList, "About">> =
  () => {
    return (
      <View style={styles.container}>
        <Text>About Screen</Text>
      </View>
    );
  };

type DrawersParamList = {
  DrawerScreen1?: undefined;
  DrawerScreen2?: undefined;
  DrawerScreen3?: undefined;
};

const DrawerScreen: FC<
  NativeStackScreenProps<RootStackParamList, "DrawerScreen">
> = () => {
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

const DrawerScreen1: FC<
  DrawerScreenProps<RootStackParamList, "DrawerScreen1">
> = ({ navigation }) => {
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

const DrawerScreen2: FC<
  DrawerScreenProps<RootStackParamList, "DrawerScreen2">
> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Drawer Screen 2</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const DrawerScreen3: FC<
  DrawerScreenProps<RootStackParamList, "DrawerScreen3">
> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Drawer Screen 3</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
