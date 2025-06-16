import { Provider } from "react-redux";
import Router from "./router/router";
import store from "./store/store";
import { SocketProvider } from "./store/SocketProvider";
import { CanvasProvider } from "./store/CanvasProvider";

function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <CanvasProvider>
          <Router />
        </CanvasProvider>
      </SocketProvider>
    </Provider>
  );
}

export default App;
