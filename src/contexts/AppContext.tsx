import { ReactNode, createContext, useReducer } from "react";

type AppContextState = {
  isLoading: boolean;
};

const initialState = {
  isLoading: false,
};

enum Types {
  EnableLoading = "EnableLoading",
  DisableLoading = "DisableLoading",
}

const reducer = (state: AppContextState, action: any) => {
  switch (action.type) {
    case Types.EnableLoading:
      return {
        ...state,
        isLoading: true,
      };
    case Types.DisableLoading:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const AppContext = createContext<any | null>(null);

function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enableLoading = () => {
    dispatch({
      type: Types.EnableLoading,
    });
  };

  const disableLoading = () => {
    dispatch({
      type: Types.DisableLoading,
    });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        method: "AppContext",
        enableLoading,
        disableLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
