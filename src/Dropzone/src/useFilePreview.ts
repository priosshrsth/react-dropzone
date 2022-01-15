import { useState } from "react";

type IPreview = File & { url: string };
export default function useFilePreview() {
  const [previews, setPreviewImages] = useState<IPreview[]>([]);

  const setPreviews = (files: File[]) => {
    const images: IPreview[] = [];
    files.forEach((f) => {
      images.push({
        url: URL.createObjectURL(f),
        ...f
      });
    });
    setPreviewImages(images);
  };

  return {
    previews,
    setPreviews
  };
}
