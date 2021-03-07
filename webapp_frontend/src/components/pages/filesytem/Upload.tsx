import React, {
  DetailedHTMLProps,
  FormEvent,
  InputHTMLAttributes,
  ReactElement,
  useRef
} from "react";
import { uploadFile } from "../../../background/api/filesystem";

function Upload(): ReactElement {
  const fileInput = useRef<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  >();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    //@ts-ignore
    const files = Array.from(fileInput?.current?.files);
    //@ts-ignore
    uploadFile(files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload files:
        {/*@ts-ignore*/}
        <input type="file" ref={fileInput} multiple />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Upload;
