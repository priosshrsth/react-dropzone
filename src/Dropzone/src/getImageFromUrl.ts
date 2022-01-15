export default async function getImageFromUrl(url: string) {
  return new Promise((resolve) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = function (this: HTMLImageElement) {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        const dataURI = canvas.toDataURL("image/jpg");

        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(",")[0].indexOf("base64") >= 0)
          byteString = atob(dataURI.split(",")[1]);
        else byteString = unescape(dataURI.split(",")[1]);

        // separate out the mime component
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

        // write the bytes of the string to a typed array
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        resolve(new Blob([ia], { type: mimeString }));
      } catch (_e) {
        resolve(undefined);
      }
    };

    img.src = url;
  });
}
