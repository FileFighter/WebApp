import React, { Suspense } from "react"
import { PasswordFeedback } from "react-password-strength-bar"

// lazy load the lib
const PasswordStrengthBar = React.lazy(
    () => import("react-password-strength-bar")
)

/**
 * @typedef {Object} PasswordStrengthBarWrapperArgs
 * @property {string} currentPassword
 * @property {(number, PasswordFeedback) => void} scoreChangeCallback
 */
type PasswordStrengthBarWrapperArgs = {
    currentPassword: string
    scoreChangeCallback: (score: number, feedback: PasswordFeedback) => void
}

/**
 * A component wrapping the password strength checks by lazy loading the component if necessary.
 * @param {PasswordStrengthBarWrapperArgs}
 * @returns password strength bar or null, depending on if user already inserted a password
 */

const PasswordStrengthBarWrapper = ({
    currentPassword,
    scoreChangeCallback,
}: PasswordStrengthBarWrapperArgs): JSX.Element | null => {
    // if the user typed something show the component
    if (currentPassword.length > 0) {
        return (
            <Suspense fallback={""}>
                <PasswordStrengthBar
                    password={currentPassword}
                    onChangeScore={(score, feedback) =>
                        scoreChangeCallback(score, feedback)
                    }
                    scoreWords={["weak", "weak", "ok", "strong", "epic"]}
                />
            </Suspense>
        )
    } else {
        return null
    }
}

export { PasswordStrengthBarWrapper }
