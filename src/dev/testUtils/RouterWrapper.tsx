import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

export const RouterWrapper: React.FC = ({ children }) => {
  const history = createMemoryHistory();

  return <Router history={history}> {children} </Router>;
};
