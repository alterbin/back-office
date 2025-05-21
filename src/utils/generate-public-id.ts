export const getPublicIdFromUrl = (url: string): string => {
  try {
    // Example URL: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/public_id.jpg
    const urlParts = url.split("/");
    const fileNameWithExtension = urlParts[urlParts.length - 1];

    // Remove file extension
    const publicId = fileNameWithExtension.split(".")[0];

    // If the URL includes folders, include them in the public ID
    const uploadIndex = urlParts.indexOf("upload");
    if (uploadIndex !== -1 && uploadIndex < urlParts.length - 2) {
      // Get all parts after "upload" but before the filename
      const folderPath = urlParts
        .slice(uploadIndex + 2, urlParts.length - 1)
        .join("/");
      return folderPath ? `${folderPath}/${publicId}` : publicId;
    }

    return publicId;
  } catch (error) {
    console.error("Failed to extract public ID from URL:", error);
    return "";
  }
};
