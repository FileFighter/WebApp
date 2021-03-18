import React, { ReactElement } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { filesBaseUrl } from "./Filesystem";

type Props = {
  path: string;
  setPath: Function;
};

export function FilesBreadcrumb(props: Props): ReactElement {
  console.log(props.path);
  return (
    <Breadcrumb>
      <Link
        className={"breadcrumb-item active"}
        to={filesBaseUrl}
        onClick={() => props.setPath("/")}
      >
        Home{" "}
      </Link>
      {props.path
        .split("/")
        .filter((s: string) => s)
        .map((folder: string, i: number) => {
          return (
            <Link
              className={"breadcrumb-item active"}
              to={
                filesBaseUrl +
                props.path
                  .split("/")
                  .slice(0, i + 2)
                  .join("/")
              }
              onClick={() =>
                props.setPath(
                  props.path
                    .split("/")
                    .slice(0, i + 2)
                    .join("/")
                )
              }
              key={i}
            >
              {folder}{" "}
            </Link>
          );
        })}
    </Breadcrumb>
  );
}
