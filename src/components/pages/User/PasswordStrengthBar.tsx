import React, { Suspense } from "react"
import { PasswordFeedback } from "react-password-strength-bar"

// lazy load the lib
const PasswordStrengthBar = React.lazy(
    () => import("react-password-strength-bar")
)

/**
 * PasswordStrengthBarWrapper component's parameter type.
 */
export type PasswordStrengthBarWrapperArgs = {
    /** The password to check. */
    currentPassword: string
    /**
     * A function which receives the password's strength and reacts to it.
     * @param score The score rating the quality of the password.
     * @param feedback Object containing information regarding the feedback's design.
     */
    scoreChangeCallback: (score: number, feedback: PasswordFeedback) => void
}

/**
 * A component wrapping the password strength checks by lazy loading the component if necessary.
 * @param {PasswordStrengthBarWrapperArgs}
 * @returns PasswordStrengthBar or null, depending on if user already inserted a password.
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
