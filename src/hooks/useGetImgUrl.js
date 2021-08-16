import { useState, useEffect } from "react";
import { fbStorage } from "../api/services/firebase";

const useGetImgUrl = (image) => {
  const [imgURL, setImgURL] = useState([]);
  const [progress, setProgress] = useState();

  useEffect(() => {
    if (image !== "" && image !== undefined) {
      if (image.size) {
        const storageRef = fbStorage.ref(
          `/profileImg/${image.name} ${new Date().getTime()}`
        );
        const img = storageRef.put(image);
        img.on(
          "state_changed",
          (snapshot) => {
            setProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (err) => {
            console.log(err);
          },
          async () => {
            const downloadURLImg = await img.snapshot.ref.getDownloadURL();
            setImgURL(downloadURLImg);
          }
        );
      }
    }
  }, [image]);
  return [imgURL, progress];
};

export default useGetImgUrl;
