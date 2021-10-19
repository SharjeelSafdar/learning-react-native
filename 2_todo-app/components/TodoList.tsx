import React, { FC, useState } from "react";
import {
  Text,
  HStack,
  FlatList,
  Checkbox,
  IconButton,
  Icon,
  Input,
  VStack,
  View,
} from "native-base";
import { FontAwesome, Feather } from "@expo/vector-icons";

const TodosList: FC = () => {
  const [todoText, setTodoText] = useState("");
  const [currentId, setCurrentId] = useState(123456);

  interface Todo {
    id: string;
    text: string;
    completed: boolean;
  }
  const initialTodos: Todo[] = [
    { id: "1", text: "Buy grocery.", completed: false },
    { id: "2", text: "Wash the car.", completed: true },
    { id: "3", text: "Play badminton.", completed: false },
    { id: "4", text: "Make a todo app.", completed: true },
  ];
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = () => {
    setTodos(prev => [
      { id: currentId.toString(), text: todoText, completed: false },
      ...prev,
    ]);
    setCurrentId(prev => prev + 1);
    setTodoText("");
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => {
      return prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    });
  };

  const editTodo = (id: string) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      console.error("Edit Todo: invalid id");
    }
    const todoToEdit = todos[todoIndex];
    deleteTodo(id);
    setTodoText(todoToEdit.text);
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <VStack paddingX={5} paddingY={5} minW="100%">
      <HStack justifyContent="space-between" mb={5} space={3}>
        <Input
          value={todoText}
          onChangeText={v => setTodoText(v)}
          placeholder="Add Todo"
          flex={1}
        />
        <IconButton
          borderRadius="sm"
          variant="solid"
          justifyContent="center"
          alignItems="center"
          icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />}
          onPress={addTodo}
        />
      </HStack>
      <FlatList
        data={todos}
        keyExtractor={(todo: Todo) => todo.id}
        renderItem={({ item: todo }) => (
          <HStack my={3} w="100%">
            <View flex={1}>
              <Checkbox
                isChecked={todo.completed}
                value={todo.text}
                onChange={() => toggleTodo(todo.id)}
              >
                <Text mx={3} strikeThrough={todo.completed}>
                  {todo.text}
                </Text>
              </Checkbox>
            </View>
            <IconButton
              onPress={() => editTodo(todo.id)}
              size="sm"
              colorScheme="trueGray"
              px={3}
              icon={
                <Icon
                  as={FontAwesome}
                  name="pencil"
                  color="trueGray.400"
                  size="sm"
                />
              }
            />
            <IconButton
              onPress={() => deleteTodo(todo.id)}
              size="sm"
              colorScheme="trueGray"
              icon={
                <Icon
                  as={FontAwesome}
                  name="trash"
                  color="trueGray.400"
                  size="sm"
                />
              }
            />
          </HStack>
        )}
      />
    </VStack>
  );
};

export default TodosList;
