import React from "react"
import info_svg from "../../../assets/images/icons/material.io/info-24px.svg"
import check_svg from "../../../assets/images/icons/material.io/check_circle-24px.svg"

// inner component rendering the checks
export interface RuleCheckerProps {
    isRuleMet: boolean
    ruleDesc: string
    /** Alt text for image*/
    imageAlt: string
}
/**
 * Reviews if a rule is to check because it was fulfilled and returns a component containing positive checks or warnings, depending on the result.
 * Consists of an image (check or info), a "Done" or "Missing" information and a description of the rule
 * @param {RuleCheckerProps} ruleInfos
 * @param {boolean} ruleInfos.isRuleMet Is rule fulfilled or are there things missing
 * @param {string} ruleInfos.ruleDesc Description of rule
 * @param {string} ruleInfos.imageAlt Alt text for done/missing-icons
 * @returns A React component
 */
const RuleChecker = ({
    isRuleMet,
    ruleDesc,
    imageAlt,
}: RuleCheckerProps): JSX.Element => {
    return (
        <div>
            <img alt={imageAlt} src={isRuleMet ? check_svg : info_svg} />
            <span className={"sr-only"}>
                {isRuleMet ? "Done: " : "Missing: "}
            </span>
            <span className={isRuleMet ? "text-success" : "text-muted"}>
                {ruleDesc}
            </span>
        </div>
    )
}

export { RuleChecker }
