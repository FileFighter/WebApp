import { render } from "@testing-library/react";
import React from "react";
import { FilesBreadcrumb } from "../FilesBreadcrumb";
import { Wrapper } from "../../../../dev/testUtils/Wrapper";

test("renders path Breadcrumb", () => {
    const breadcrumb = render(
        <Wrapper>
            <FilesBreadcrumb path={"/bla/fasel/file"} />
        </Wrapper>
    );

    expect(breadcrumb).toMatchSnapshot();
});
