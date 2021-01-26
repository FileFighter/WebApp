import React, { ReactElement } from "react";
import { Button } from "react-bootstrap";

function ToolbarActions(): ReactElement {
  return (
    <span>
      <Button>Delete</Button>
      <Button>Download</Button>
    </span>
  );
}

export default ToolbarActions;
