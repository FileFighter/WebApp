import { storiesOf } from "@storybook/react";
import { BottomBanner } from "../BottomBanner";
import { TopBanner } from "../TopBanner";

storiesOf("Banner", module)
    .add("BottomBanner", () =>
        <BottomBanner />
    )

    .add("TopBanner", () =>
        <TopBanner />
    );