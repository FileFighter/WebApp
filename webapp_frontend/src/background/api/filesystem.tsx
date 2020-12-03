import {BackendFolderContentsData} from "./filesystemTypes";


export const getFolderContents=(path:string)=>new Promise<BackendFolderContentsData>((resolve, reject)=>resolve(exampleValue(path)))






const exampleValue=(path:string) :BackendFolderContentsData=> {
    console.log(path)
  if (path=="/")return {  "files": [
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
            "size": 0,
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
            "size": 0,
            "type": "FOLDER"
        }
    ]
}
  else if (path=="/fasel")return {  "files": [
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
              "size": 0,
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
              "size": 0,
              "type": "FOLDER"
          }
      ]
  }
  else if (path=="/bla") return {  "files": [
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
              "size": 0,
              "type": "FOLDER"
          }
      ],
      "folders": []
  }
  return {"files": [],"folders":[]}
}
