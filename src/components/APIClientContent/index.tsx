import type { API_CLIENT_TAB } from "../../types";
import APIClientBodyManager from "../APIClientBodyManager";
import APIClientHeaderManager from "../APIClientHeaderManager";
import APIClientQueryParamManager from "../APIClientQueryParamManager";
import APIClientResponse from "../APIClientResponse";

interface APIClientContentProps {
  activeTab: API_CLIENT_TAB;
}

const API_CLIENT_CONTENT: Record<API_CLIENT_TAB, React.ReactNode> = {
  parameters: <APIClientQueryParamManager />,
  headers: <APIClientHeaderManager />,
  body: <APIClientBodyManager />,
  response: <APIClientResponse />,
};

function APIClientContent({ activeTab }: APIClientContentProps) {
  return <section>{API_CLIENT_CONTENT[activeTab]}</section>;
}

export default APIClientContent;
