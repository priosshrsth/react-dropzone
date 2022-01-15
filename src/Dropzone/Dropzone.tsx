import { DropzoneOptions, useDropzone } from "react-dropzone";
import classnames from "classnames";
import useFileValidation from "./src/useFileValidation";
import useFilePreview from "./src/useFilePreview";

import "./styles/animate-dropzone.scss";
import "./styles/dropzone.scss";

type IProps = DropzoneOptions & {
  dropzoneClass?: string;
  preview?: boolean;
  previewContainerClass?: string;
  className?: string;
  multiple?: boolean;
  clickAnywhereForUpload?: boolean;
};

export default function ({
  className = "",
  dropzoneClass = "",
  preview = true,
  previewContainerClass = "",
  multiple = false,
  clickAnywhereForUpload = false,
  ...props
}: IProps) {
  const { previews, setPreviews } = useFilePreview();

  const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    setPreviews(acceptedFiles);
  };

  const { onDragOver, isInvalid } = useFileValidation(props);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDragOver,
    ...props
  });
  return (
    <>
      <div
        className={classnames([
          `dropzone-container`,
          className,
          isDragActive ? "drag-active" : "",
          isInvalid ? "invalid" : ""
        ])}
        onClick={clickAnywhereForUpload ? open : () => {}}
        {...getRootProps()}
      >
        <div className="topbottom" />
        <div className="leftright" />
        <div className={`dropzone ${dropzoneClass}`}>
          <div className="instruction">
            <p>Drag and drop your files here.</p>
            {!clickAnywhereForUpload && (
              <div>
                <button className="uploadBtn" onClick={open}>
                  Click Here
                </button>
              </div>
            )}
          </div>
        </div>

        <input {...getInputProps()} multiple={multiple} />
      </div>
      {preview && (
        <>
          <div
            className={classnames("preview-container", previewContainerClass)}
          >
            {previews.map((file, index) => {
              return (
                <img key={index + file.name} src={file.url} alt={file.name} />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
