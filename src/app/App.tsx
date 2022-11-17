import React from "react";
import { HeaderOfPage } from "../features/just-info-pages/HeaderOfPage";
import { TelegramPanel } from "../features/telegram-api/TelegramPanel";

function App(): React.ReactElement {
  const [darkMode, setDarkMode] = React.useState(false);

  const handleDarkMode = (isDark: boolean) => {
    setDarkMode(isDark);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
        <HeaderOfPage handleDarkMode={handleDarkMode} />
        <TelegramPanel />
      </div>
    </div>
  );
}

export default App;
