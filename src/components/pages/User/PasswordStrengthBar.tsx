import React, { Suspense } from "react";

// lazy load the lib
const PasswordStrengthBar = React.lazy(() => import("react-password-strength-bar"));

type PasswordStrengthBarWrapperArgs = {
    currentPassword: string
}

// a small component wrapping the password strength checks by lazy loading the component if necessary.
const PasswordStrengthBarWrapper = ({ currentPassword }: PasswordStrengthBarWrapperArgs): JSX.Element | null => {
    // if the user typed something show the component
    if (currentPassword.length > 0) {
        return (
            <Suspense fallback={""}>
                <PasswordStrengthBar password={currentPassword} />
            </Suspense>
        )
    } else {
        return null;
    }
}

export { PasswordStrengthBarWrapper }
