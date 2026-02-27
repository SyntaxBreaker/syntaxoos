import type { API_CLIENT_TAB } from "../../types";
import APIClientBodyManager from "../APIClientBodyManager";
import APIClientHeaderManager from "../APIClientHeaderManager";
import APIClientQueryParamManager from "../APIClientQueryParamManager";
import APIClientResponse from "../APIClientResponse";

interface APIClientContentProps {
  activeTab: API_CLIENT_TAB;
}

const API_CLIENT_CONTENT: Record<API_CLIENT_TAB, React.ReactNode> = {
  Parameters: <APIClientQueryParamManager />,
  Headers: <APIClientHeaderManager />,
  Body: <APIClientBodyManager />,
  Response: <APIClientResponse />,
};

function APIClientContent({ activeTab }: APIClientContentProps) {
  return <div>{API_CLIENT_CONTENT[activeTab]}</div>;
}

export default APIClientContent;
