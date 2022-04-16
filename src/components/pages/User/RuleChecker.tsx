import React from "react"
import info_svg from "../../../assets/images/icons/material.io/info-24px.svg"
import check_svg from "../../../assets/images/icons/material.io/check_circle-24px.svg"

// inner component rendering the checks
/**
 * @typedef {Object} RuleCheckProps
 * @property {boolean} ruleToCheck
 * @property {string} ruleDesc
 * @property {string} imageAlt path to image
 */
type RuleCheckerProps = {
    ruleToCheck: boolean
    ruleDesc: string
    imageAlt: string
}
/**
 * Reviews if a rule is to check because it was fulfilled and returns a component containing positive checks or warnings, depending on the result
 * Consists of an image (check or info), a "Done" or "Missing" information and a description of the rule
 * @param {RuleCheckerProps}
 * @returns A React component
 */
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
