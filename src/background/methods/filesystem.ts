export const getPathWithOutName = (
  pathWithName: string,
  name: string
): string => {
  return pathWithName.substr(0, pathWithName.lastIndexOf(name));
};
