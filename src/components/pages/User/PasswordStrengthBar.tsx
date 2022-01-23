import React, { Suspense } from "react"
import { PasswordFeedback } from "react-password-strength-bar"

// lazy load the lib
const PasswordStrengthBar = React.lazy(
    () => import("react-password-strength-bar")
)

type PasswordStrengthBarWrapperArgs = {
    currentPassword: string
    scoreChangeCallback: (score: number, feedback: PasswordFeedback) => void
}

// a small component wrapping the password strength checks by lazy loading the component if necessary.
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
