import type { API_CLIENT_TAB } from "../../types";
import APIClientRequestTab from "../APIClientRequestTab";

interface APIClientRequestTabsProps {
  activeTab: API_CLIENT_TAB;
  setActiveTab: React.Dispatch<React.SetStateAction<API_CLIENT_TAB>>;
}

const TABS: API_CLIENT_TAB[] = ["Parameters", "Headers", "Body", "Response"];

function APIClientRequestTabs({
  activeTab,
  setActiveTab,
}: APIClientRequestTabsProps) {
  return (
    <nav className="flex flex-row gap-8 text-sm">
      {TABS.map((tab, idx) => (
        <APIClientRequestTab
          key={idx}
          label={tab}
          value={tab}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </nav>
  );
}

export default APIClientRequestTabs;
