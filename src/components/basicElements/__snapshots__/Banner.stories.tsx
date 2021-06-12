import { storiesOf } from "@storybook/react";
import { BottomBanner } from "../bottomArea/BottomBanner";
import { TopBanner } from "../topArea/TopBanner";

storiesOf("Banner", module)
    .add("BottomBanner", () => <BottomBanner />)

    .add("TopBanner", () => <TopBanner />);
