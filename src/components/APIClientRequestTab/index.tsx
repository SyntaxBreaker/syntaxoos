import type { API_CLIENT_TAB } from "../../types";

interface APIClientRequestTabProps {
  label: API_CLIENT_TAB;
  value: API_CLIENT_TAB;
  activeTab: API_CLIENT_TAB;
  setActiveTab: React.Dispatch<React.SetStateAction<API_CLIENT_TAB>>;
}

function APIClientRequestTab({
  label,
  value,
  activeTab,
  setActiveTab,
}: APIClientRequestTabProps) {
  const isActive = activeTab === value;

  return (
    <button
      className={`text-gray-200 hover:cursor-pointer ${isActive ? "border-b border-gray-200" : "border-none"}`}
      onClick={() => setActiveTab(label)}
    >
      {label}
    </button>
  );
}

export default APIClientRequestTab;
