import { EditablePreflightEntityOrFile, PreflightEntity } from "./preflightTypes";

export const preflightResultCombine  = (files: EditablePreflightEntityOrFile[], response: PreflightEntity[]) => {

  return files.map((file:EditablePreflightEntityOrFile) => {
    const resInfo = response.find((e) => e.path === file.path);
    file.permissionIsSufficient =
      resInfo?.permissionIsSufficient ?? true;
    file.nameAlreadyInUse = resInfo?.nameAlreadyInUse ?? false;
    file.nameIsValid = resInfo?.nameIsValid ?? true;

    return file;
  });
}
