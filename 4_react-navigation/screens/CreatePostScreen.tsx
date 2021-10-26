import React, { FC, useEffect, useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenPropsType } from "../types";

const CreatePostScreen: FC<StackScreenPropsType<"CreatePost">> = ({
  navigation,
}) => {
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

export default CreatePostScreen;
