import { useState } from "react";
import APIClientRequestTabs from "../APIClientRequestTabs";
import APIClientToolbar from "../APIClientToolbar";
import type { API_CLIENT_TAB } from "../../types";
import APIClientContent from "../APIClientContent";
import Separator from "../Separator";

function APIClient() {
  const [activeTab, setActiveTab] = useState<API_CLIENT_TAB>("parameters");

  return (
    <article className="flex flex-col gap-4 p-2">
      <APIClientToolbar />
      <APIClientRequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Separator />
      <APIClientContent activeTab={activeTab} />
    </article>
  );
}

export default APIClient;
