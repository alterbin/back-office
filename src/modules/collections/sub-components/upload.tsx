import { PlusCircle, X } from "@/components";
import { getPublicIdFromUrl } from "@/utils";
import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";

interface IProps {
  photos: string[];
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  label?: string;
  required?: boolean;
}

export default function ImageUploader({
  photos,
  setPhotos,
  required,
  label,
}: IProps) {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const tempImageUrl = URL.createObjectURL(file); // Show preview before upload
    setUploadingImage(tempImageUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (data.secure_url) {
          setPhotos((prevPhotos) => [...prevPhotos, data.secure_url]);
        }
      } else {
        toast.error(`Upload failed: ${xhr.statusText}`);
      }
      setUploadProgress(0);
      setUploadingImage(null);
    };

    xhr.onerror = () => {
      console.log("Upload error:", xhr.statusText);
      setUploadProgress(0);
      setUploadingImage(null);
    };

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
    );
    xhr.send(formData);
  };

  const handleFileSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg, image/png, image/jpg";
    input.style.display = "none";

    input.addEventListener("change", (event) => {
      handleUpload(event as unknown as ChangeEvent<HTMLInputElement>);
    });

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const handleDelete = async (index: number) => {
    const imageToDelete = photos[index];

    if (!imageToDelete) return;

    try {
      const publicId = getPublicIdFromUrl(imageToDelete);

      if (!publicId) {
        toast.error("Failed to delete image from cloud storage");
        return;
      }

      const response = await fetch("/api/cloudinary/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to delete from Cloudinary"
        );
      }

      toast.success("Image deleted successfully");
      setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      toast.error("Failed to delete image from cloud storage");
    }
  };

  return (
    <div className="flex flex-col gap-1 ">
      <label className="text-sec_text_color mb-2 text-base font-semibold">
        {label}
        {required && <span className="text-red-10 ml-1">*</span>}
      </label>
      <div className="bg-[#FAFAFA] border border-[#E5E5E5] min-h-[144px] w-full border-dashed rounded-2xl flex px-4 py-4 md:py-0 items-center">
        <div className="flex items-center flex-wrap gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative w-24 h-20">
              <button
                onClick={() => handleDelete(index)}
                type="button"
                className="absolute top-[5px] left-[5px] md:h-[30px] w-4 h-4 md:w-[30px] cursor-pointer text-white border-none flex items-center justify-center bg-[#ffffff] md:rounded-lg rounded-md z-20"
              >
                <X />
              </button>
              <img
                src={photo}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}

          {uploadingImage && (
            <div className="relative w-24 h-20">
              <img
                src={uploadingImage}
                alt="Uploading"
                className="w-full h-full object-cover rounded-lg opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#00000080] rounded-lg">
                <span className="text-white text-xs">Uploading...</span>
                <div className="w-4/5 bg-gray-300 rounded-full h-2 mt-1">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleFileSelect}
            className="border border-[#E5E5E5] w-24 h-20 rounded-lg flex justify-center items-center border-dashed ml-3"
          >
            <PlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
