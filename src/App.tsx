import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";
import { useUIStore } from "./store/UIStore";

function App() {
  const showBootScreen = useUIStore((state) => state.showBootScreen);

  if (showBootScreen) {
    return <BootScreen />;
  }

  return <Desktop />;
}

export default App;
