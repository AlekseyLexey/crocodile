import { Provider } from "react-redux";
import Router from "./router/router";
import store from "./store/store";
import { SocketProvider } from "./store/SocketProvider";

function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <Router />
      </SocketProvider>
    </Provider>
  );
}

export default App;
