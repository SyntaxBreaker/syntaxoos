import { useState } from "react";
import APIClientRequestTabs from "../APIClientRequestTabs";
import APIClientToolbar from "../APIClientToolbar";
import type { API_CLIENT_TAB } from "../../types";
import APIClientContent from "../APIClientContent";

function APIClient() {
  const [activeTab, setActiveTab] = useState<API_CLIENT_TAB>("Parameters");

  return (
    <div className="flex flex-col gap-4 p-2">
      <APIClientToolbar />
      <APIClientRequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <hr className="border border-gray-600" />
      <APIClientContent activeTab={activeTab} />
    </div>
  );
}

export default APIClient;
