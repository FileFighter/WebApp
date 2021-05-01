import { EditablePreflightEntityOrFile, PreflightEntity } from "./preflightTypes";

export const preflightResultCombine = (files: EditablePreflightEntityOrFile[], response: PreflightEntity[]) => {

  return files.map((file: EditablePreflightEntityOrFile) => {
    console.log(response)
    const resInfo = response.find((e) => (e.path === (file.newPath ?? file.path)) || ("/" + e.path === (file.newPath ?? file.path)));
    // could be done better if rest returned paths with leading slashes
    if (!resInfo){console.error("Did not found a response for the file:",file)}

    file.permissionIsSufficient =
      resInfo?.permissionIsSufficient ?? true;
    file.nameAlreadyInUse = resInfo?.nameAlreadyInUse ?? false;
    file.nameIsValid = resInfo?.nameIsValid ?? true;
    file.isFile = resInfo?.isFile ?? true;

    return file;
  });
};
