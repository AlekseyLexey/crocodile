import { Provider } from "react-redux";
import Router from "./router/router";
import store from "./store/store";
import { SocketProvider } from "./store/SocketProvider";
import { CanvasProvider } from "./store/CanvasProvider";
import { AlertProvider } from "@/shared/providers/AlertProvider";

function App() {
  return (
    <Provider store={store}>
      <AlertProvider>
      <SocketProvider>
        <CanvasProvider>
          <Router />
        </CanvasProvider>
      </SocketProvider>
      </AlertProvider>
    </Provider>
  );
}

export default App;
