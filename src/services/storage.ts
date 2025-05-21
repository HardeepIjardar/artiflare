import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const storage = getStorage();

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param file The file to upload.
 * @param path The storage path (e.g., 'products/{productId}/{filename}').
 */
export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (url: string): Promise<void> => {
  try {
    // Extract the path from the URL
    const path = decodeURIComponent(url.split('/o/')[1].split('?')[0]);
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

export const uploadMultipleImages = async (files: File[], basePath: string): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file, index) => {
      const timestamp = Date.now();
      const path = `${basePath}/${timestamp}_${index}_${file.name}`;
      return uploadImage(file, path);
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw new Error('Failed to upload images');
  }
}; 