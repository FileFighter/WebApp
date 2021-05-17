import {FsEntity} from "../api/filesystemTypes";

export const getPathWithoutName = (
  pathWithName: string,
  name: string
): string => {
  return pathWithName.substr(0, pathWithName.lastIndexOf(name.toLowerCase()));
};


export const removeTrailingBackslash = (path : string): string => {
  if (path.lastIndexOf("/") +1 === path.length){
    return path.substr(0,path.length -1)
  }
  return path
}


export  const  isFsEntityInFolder = (fsEntity: FsEntity, path :string) =>{
  let fsEntityPath = getPathWithoutName(fsEntity.path,fsEntity.name);
  fsEntityPath = removeTrailingBackslash(fsEntityPath);

  return fsEntityPath === path.toLocaleLowerCase();
}
