import {BackendFolderContentsData} from "./filesystemTypes";
import {hostname, filesytemPath} from "./api";
import Axios from "axios";

export const getFolderContents = (path: string) => new Promise<BackendFolderContentsData>((resolve, reject) => {


    let config = {
        headers: {
            "X-FF-PATH": path
        },
    };


    console.log(`[filesytem api] request folder content of ${path}`);

    Axios.get(hostname + filesytemPath + '/contents',config)
        .then(response=>resolve(response.data))
        .catch(error=>reject(error))


   // resolve(exampleValue(path))
})

const exampleValue = (path: string): BackendFolderContentsData => {
    if (path === "/") return exampleFileSystem
    else if (path === "/fasel") return exampleFileSystem
    else if (path === "/bla") return {
        "files": [
            {
                "createdByUserId": 0,
                "id": 0,
                "lastUpdated": 153354,
                "name": "inBLA",
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
                "size": 546,
                "type": "file"
            },
            {
                "createdByUserId": 1,
                "id": 0,
                "lastUpdated": 1597177368,
                "name": "text.txt",
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
                "size": 1332,
                "type": "file"
            },
            {
                "createdByUserId": 2,
                "id": 0,
                "lastUpdated": 1599147368,
                "name": "sound.mp3",
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
                "size": 27565846,
                "type": "file"
            },
            {
                "createdByUserId": 1,
                "id": 0,
                "lastUpdated": 1602047368,
                "name": "movie.mp4",
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
                "size": 224850446,
                "type": "file"
            },
            {
                "createdByUserId": 2,
                "id": 0,
                "lastUpdated": 1599949968,
                "name": "image.jpg",
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
                "size": 4866848,
                "type": "file"
            },
            {
                "createdByUserId": 1313,
                "id": 0,
                "lastUpdated": 1599992468,
                "name": "importantFile.md",
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
                "size": 96643,
                "type": "file"
            },
            {
                "createdByUserId": 2,
                "id": 0,
                "lastUpdated": 1601584968,
                "name": "likeMe.html",
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
                "size": 861858,
                "type": "file"
            }
        ],
        "folders": [{
            "createdByUserId": 0,
            "id": 0,
            "lastUpdated": 1601148846,
            "name": "unterBla",
            "path": "/bla/unterBla",
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
            "size": 18975576,
            "type": "FOLDER"
        }]
    }
    else if (path === "/bla/unterBla") return {
        "files": [
            {
                "createdByUserId": 0,
                "id": 0,
                "lastUpdated": 0,
                "name": "inBLA",
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
                "size": 5489,
                "type": "file"
            }
        ],
        "folders": []
    }
    return {"files": [], "folders": []}
}

const exampleFileSystem = {
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
            "size": 13,
            "type": "FOLDER"
        }
    ],
    "folders": [
        {
            "createdByUserId": 0,
            "id": 0,
            "lastUpdated": 0,
            "name": "bla",
            "path": "/bla",
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
            "size": 864070843,
            "type": "FOLDER"
        },
        {
            "createdByUserId": 0,
            "id": 0,
            "lastUpdated": 0,
            "name": "fasel",
            "path": "/fasel",
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
            "size": 1684035,
            "type": "FOLDER"
        }
    ]
}
