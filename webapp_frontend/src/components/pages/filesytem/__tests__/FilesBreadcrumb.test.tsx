import { render } from "@testing-library/react";
import React from "react";
import { FilesBreadcrumb } from "../FilesBreadcrumb";
import { RouterWrapper } from "../../../../dev/testUtils/RouterWrapper";

test("renders path Breadcrumb", () => {
  const breadcrumb = render(
    <RouterWrapper>
      <FilesBreadcrumb path={"bla/fasel/file"} setPath={jest.fn()} />
    </RouterWrapper>
  );

  expect(breadcrumb).toMatchSnapshot();
});
