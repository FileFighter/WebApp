import {BackendFolderContentsData} from "./filesystemTypes";


export const getFolderContents=()=>new Promise<BackendFolderContentsData>((resolve, reject)=>resolve(exampleValue))






const exampleValue:BackendFolderContentsData={
    "files": [
        {
            "createdByUserId": 0,
            "id": 0,
            "lastUpdated": 0,
            "name": "string",
            "permissionSet": {
                "editableForGroups": [
                    "ADMIN"
                ],
                "editableForUsers": [
                    {
                        "groups": [
                            "ADMIN"
                        ],
                        "id": 0,
                        "username": "string"
                    }
                ],
                "visibleForGroups": [
                    "ADMIN"
                ],
                "visibleForUsers": [
                    {
                        "groups": [
                            "ADMIN"
                        ],
                        "id": 0,
                        "username": "string"
                    }
                ]
            },
            "size": 0,
            "type": "FOLDER"
        }
    ],
    "folders": [
        {
            "createdByUserId": 0,
            "id": 0,
            "lastUpdated": 0,
            "name": "string",
            "path": "string",
            "permissionSet": {
                "editableForGroups": [
                    "ADMIN"
                ],
                "editableForUsers": [
                    {
                        "groups": [
                            "ADMIN"
                        ],
                        "id": 0,
                        "username": "string"
                    }
                ],
                "visibleForGroups": [
                    "ADMIN"
                ],
                "visibleForUsers": [
                    {
                        "groups": [
                            "ADMIN"
                        ],
                        "id": 0,
                        "username": "string"
                    }
                ]
            },
            "size": 0,
            "type": "FOLDER"
        }
    ]
}
