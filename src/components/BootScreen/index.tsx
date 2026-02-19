import { useEffect } from "react";
import { useUIStore } from "../../store/UIStore";

function BootScreen() {
  const toggleBootScreen = useUIStore((state) => state.toggleBootScreen);
  const toggleDesktop = useUIStore((state) => state.toggleDesktop);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      toggleBootScreen();
      toggleDesktop();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950">
      <div className="relative flex h-24 w-auto px-8 items-center justify-center rounded-full bg-gradient-to-r from-gray-600 to-gray-700 shadow-2xl animate-bounce">
        <span className="text-4xl font-bold text-gray-200">SyntaxoOS</span>
      </div>
    </div>
  );
}

export default BootScreen;
