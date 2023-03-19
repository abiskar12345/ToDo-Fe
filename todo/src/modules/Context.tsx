import React, { createContext, useCallback, useState } from "react";
import * as Service from "./Service";

interface Todo {
  _id: string;
  name: string;
  dateTime: Date;
  shortDescription: string;
  status: string;
}

interface AppState {
  todos: Todo[];
  refresh: boolean;
  singleTask: Todo;
}

interface AppContextProps extends AppState {
  getTodos: (query: any) => Promise<void>;
  addTodo: (payload: any) => Promise<void>;
  updateTodo: (params: any, payload: any) => Promise<void>;
  deleteTodo: (params: any) => Promise<void>;
  refreshState: () => void;
  getById: (id: string) => Promise<void>;
}

const initialState: AppState = {
  todos: [],
  refresh: false,
  singleTask: {
    _id: "",
    name: "",
    dateTime: new Date(),
    shortDescription: "",
    status: "",
  },
};

export const AppContext = createContext<AppContextProps>({
  ...initialState,
  getTodos: async () => {},
  addTodo: async () => {},
  updateTodo: async () => {},
  deleteTodo: async () => {},
  refreshState: () => {},
  getById: async () => {},
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>(initialState);

  const refreshState = (): void =>
    setState((prev) => ({ ...prev, refresh: !prev.refresh }));

  const getTodos = useCallback(async (query: any): Promise<void> => {
    const data = await Service.listTodos(query);

    setState((prev) => ({ ...prev, todos: [...data] }));
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
  const getById = async (id: string): Promise<void> => {
    let data = await Service.getById(id);
    setState((prev) => ({ ...prev, singleTask: data }));
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
        getById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export type { Todo };
