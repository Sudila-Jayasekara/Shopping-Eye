import { useState } from 'react';
import { uploadImage } from './InventoryService'; // Correct path

const UploadWidget = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        try {
            const url = await uploadImage(selectedFile); // Upload the image and get the URL
            setImageUrl(url); // Set the URL for the uploaded image
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="upload-widget p-6">
            <h2 className="text-xl font-bold mb-4">Upload Image</h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4"
            />
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Upload
            </button>
            {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="Uploaded" className="w-64 h-64 object-cover" />
                </div>
            )}
        </div>
    );
};

export default UploadWidget;
