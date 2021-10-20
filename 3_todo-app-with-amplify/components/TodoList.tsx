import React, { FC, useEffect, useState } from "react";
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
  Spinner,
} from "native-base";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../src/graphql/queries";
import { createTodo, updateTodo, deleteTodo } from "../src/graphql/mutations";
import {
  CreateTodoMutationVariables,
  CreateTodoMutation,
  UpdateTodoMutationVariables,
  UpdateTodoMutation,
  DeleteTodoMutationVariables,
  DeleteTodoMutation,
} from "../src/API";

const TodosList: FC = () => {
  const [todoText, setTodoText] = useState("");
  const [updatedTodoText, setUpdatedTodoText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<Todo | null>(null);

  interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = (await API.graphql(graphqlOperation(listTodos))) as any;
      const allTodos = response.data.listTodos.items as Todo[];
      console.log("AllTodos:", allTodos);
      allTodos.sort(
        (a, b) =>
          new Date(a.updatedAt).getMilliseconds() -
          new Date(b.updatedAt).getMilliseconds()
      );
      setTodos(allTodos);
    } catch {
      console.error("Error fetching todos.");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    try {
      setLoading(true);
      const variables: CreateTodoMutationVariables = {
        input: {
          text: todoText,
          completed: false,
        },
      };
      const response = (await API.graphql({
        query: createTodo,
        variables,
      })) as { data: CreateTodoMutation };
      const newTodo = response.data.createTodo;
      console.log("NewTodo:", newTodo);
      newTodo && setTodos(prev => [{ ...newTodo }, ...prev]);
      setTodoText("");
    } catch {
      console.error("Error creating new todo.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (oldTodo: Todo) => {
    try {
      setLoading(true);
      const variables: UpdateTodoMutationVariables = {
        input: {
          id: oldTodo.id,
          completed: !oldTodo.completed,
        },
      };
      const response = (await API.graphql({
        query: updateTodo,
        variables,
      })) as { data: UpdateTodoMutation };
      const updatedTodo = response.data.updateTodo;
      console.log("ToggledTodo:", updatedTodo);
      updatedTodo &&
        setTodos(prev =>
          prev.map(todo => (todo.id === oldTodo.id ? { ...updatedTodo } : todo))
        );
    } catch {
      console.error("Error toggling todo!");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (todo: Todo) => {
    setUpdatedTodoText(todo.text);
    setIsEditing(todo);
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setUpdatedTodoText("");
  };

  const editTodo = async () => {
    try {
      setLoading(true);
      if (isEditing === null) {
        throw new Error("Edit Todo: not in edit mode");
      }
      const variables: UpdateTodoMutationVariables = {
        input: {
          id: isEditing.id,
          text: updatedTodoText,
        },
      };
      const response = (await API.graphql({
        query: updateTodo,
        variables,
      })) as { data: UpdateTodoMutation };
      const updatedTodo = response.data.updateTodo;
      console.log("UpdatedTodo:", updatedTodo);
      updatedTodo &&
        setTodos(prev =>
          prev.map(todo =>
            todo.id === isEditing.id ? { ...updatedTodo } : todo
          )
        );
    } catch {
      console.error("Error updating todo text!");
    } finally {
      setLoading(false);
      setIsEditing(null);
      setUpdatedTodoText("");
    }
  };

  const deleteTodoFunc = async (id: string) => {
    try {
      setLoading(true);
      const variables: DeleteTodoMutationVariables = {
        input: { id },
      };
      const response = (await API.graphql({
        query: deleteTodo,
        variables,
      })) as { data: DeleteTodoMutation };
      const deletedTodo = response.data.deleteTodo;
      console.log("DeletedTodo:", deletedTodo);
      deletedTodo && setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch {
      console.error("Error updating todo text!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <VStack paddingX={5} paddingY={5} minW="100%">
      <HStack justifyContent="space-between" mb={5} space={3}>
        <Input
          value={todoText}
          onChangeText={setTodoText}
          placeholder="Add Todo"
          flex={1}
          isDisabled={!!isEditing}
        />
        <IconButton
          borderRadius="sm"
          variant="solid"
          justifyContent="center"
          alignItems="center"
          icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />}
          onPress={addTodo}
          disabled={!!isEditing}
        />
      </HStack>
      <HStack justifyContent="space-between" mb={5} space={3}>
        <Input
          value={updatedTodoText}
          onChangeText={setUpdatedTodoText}
          placeholder="Updated Todo Text"
          flex={1}
          isDisabled={!isEditing}
        />
        <IconButton
          borderRadius="sm"
          variant="solid"
          justifyContent="center"
          alignItems="center"
          icon={<Icon as={Feather} name="x" size="sm" color="warmGray.50" />}
          onPress={cancelEditing}
          disabled={!isEditing}
        />
        <IconButton
          borderRadius="sm"
          variant="solid"
          justifyContent="center"
          alignItems="center"
          icon={
            <Icon as={Feather} name="check" size="sm" color="warmGray.50" />
          }
          onPress={editTodo}
          disabled={!isEditing}
        />
      </HStack>
      {(loading || !!isEditing) && <Spinner size="lg" />}
      <FlatList
        data={todos}
        keyExtractor={(todo: Todo) => todo.id}
        renderItem={({ item: todo }) => (
          <HStack my={3} w="100%">
            <View flex={1}>
              <Checkbox
                isChecked={todo.completed}
                value={todo.text}
                onChange={() => toggleTodo(todo)}
                isDisabled={!!isEditing}
              >
                <Text mx={3} strikeThrough={todo.completed}>
                  {todo.text}
                </Text>
              </Checkbox>
            </View>
            <IconButton
              onPress={() => startEditing(todo)}
              size="sm"
              colorScheme="trueGray"
              px={3}
              disabled={!!isEditing}
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
              onPress={() => deleteTodoFunc(todo.id)}
              size="sm"
              colorScheme="trueGray"
              disabled={!!isEditing}
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
