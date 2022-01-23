import React, { ReactElement } from "react"
import { Breadcrumb } from "react-bootstrap"
import { Link } from "react-router-dom"
import { filesBaseUrl } from "./Filesystem"

type Props = {
    path: string
}

export function FilesBreadcrumb(props: Props): ReactElement {
    const folders = props.path.split("/").filter((s: string) => s)
    return (
        <Breadcrumb>
            <Link
                className={
                    "breadcrumb-item" + (props.path === "/" ? " active" : "")
                }
                to={filesBaseUrl}
            >
                Main
            </Link>
            {folders.map((folder: string, i: number) => {
                return (
                    <Link
                        className={
                            "breadcrumb-item" +
                            (i === folders.length - 1 ? " active" : "")
                        }
                        to={
                            filesBaseUrl +
                            props.path
                                .split("/")
                                .slice(0, i + 2)
                                .join("/")
                        }
                        key={i}
                    >
                        {folder}{" "}
                    </Link>
                )
            })}
        </Breadcrumb>
    )
}
