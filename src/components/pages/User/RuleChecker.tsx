import React from "react"
import info_svg from "../../../assets/images/icons/material.io/info-24px.svg"
import check_svg from "../../../assets/images/icons/material.io/check_circle-24px.svg"

// inner component rendering the checks
type RuleCheckerProps = {
    ruleToCheck: boolean
    ruleDesc: string
    imageAlt: string
}
const RuleChecker = ({
    ruleToCheck,
    ruleDesc,
    imageAlt,
}: RuleCheckerProps): JSX.Element => {
    return (
        <div>
            <img alt={imageAlt} src={ruleToCheck ? check_svg : info_svg} />
            <span className={"sr-only"}>
                {ruleToCheck ? "Done: " : "Missing: "}
            </span>
            <span className={ruleToCheck ? "text-success" : "text-muted"}>
                {ruleDesc}
            </span>
        </div>
    )
}

export { RuleChecker }
