import React, {
  DetailedHTMLProps,
  FormEvent,
  InputHTMLAttributes,
  ReactElement,
  useRef,
  useState
} from "react";
import { uploadFiles } from "../../../background/api/filesystem";

export const UploadZone = (): ReactElement => {
  const [inputFieldKey, setInputFieldKey] = useState(
    Math.random().toString(36)
  );
  const fileInput = useRef<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  >();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    //@ts-ignore
    const files = Array.from(fileInput?.current?.files);
    // @ts-ignore
    setInputFieldKey(Math.random().toString(36));
    //@ts-ignore
    uploadFiles(files);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload files:
        {/*@ts-ignore*/}
        <input type="file" ref={fileInput} multiple key={inputFieldKey} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UploadZone;
