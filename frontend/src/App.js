import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { SnackbarProvider } from "notistack";
import { authroutes, panelChildren } from "./routes";
import Panel from "./components/panel/Panel";
import { Provider } from "react-redux";
import { store } from "./features/store";

function App() {
  const router = createBrowserRouter([
    ...authroutes,
    {
      path: "user_management",
      element: <Panel />,
      children: [
        ...panelChildren.map((el) => {
          const { path, element } = el;
          return {
            path,
            element,
          };
        }),
      ],
    },
  ]);
  return (
    <Provider store={store}>
    <SnackbarProvider autoHideDuration={3000} maxSnack={2}>
      <RouterProvider router={router} />
    </SnackbarProvider>
    </Provider>
  );
}

export default App;
