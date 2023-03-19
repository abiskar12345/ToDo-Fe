import React, { createContext, useCallback, useState } from "react";
import * as Service from "./Service";

interface Todo {
  id: number;
  name: string;
  dateTime: Date;
  shortDescription: string;
  status: string;
}

interface AppState {
  todos: Todo[];
  refresh: boolean;
}

interface AppContextProps extends AppState {
  getTodos: (query: any) => Promise<void>;
  addTodo: (payload: any) => Promise<void>;
  updateTodo: (params: any, payload: any) => Promise<void>;
  deleteTodo: (params: any) => Promise<void>;
  refreshState: () => void;
}

const initialState: AppState = {
  todos: [],
  refresh: false,
};

export const AppContext = createContext<AppContextProps>({
  ...initialState,
  getTodos: async () => {},
  addTodo: async () => {},
  updateTodo: async () => {},
  deleteTodo: async () => {},
  refreshState: () => {},
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>(initialState);

  const refreshState = (): void =>
    setState((prev) => ({ ...prev, refresh: !prev.refresh }));

  const getTodos = useCallback(async (query: any): Promise<void> => {
    const data = await Service.listTodos(query);

    setState((prev) => ({ ...prev, todos: [...prev.todos, ...data] }));
  }, []);

  const addTodo = (payload: any): Promise<void> => {
    return Service.addTodo(payload);
  };

  const updateTodo = (params: any, payload: any): Promise<void> => {
    return Service.updateTodo(params, payload);
  };

  const deleteTodo = (params: any): Promise<void> => {
    return Service.deleteTodo(params);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        getTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        refreshState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export type { Todo };
