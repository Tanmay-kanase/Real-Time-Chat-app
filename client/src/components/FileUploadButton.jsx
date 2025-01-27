import  { useState } from "react";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const FileUploadModal = ({ isOpen, onClose, onSelectFileType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold dark:text-white">Upload File</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            ✖
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onSelectFileType("image")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Image (JPG, PNG)
          </button>
          <button
            onClick={() => onSelectFileType("pdf")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            PDF
          </button>
          <button
            onClick={() => onSelectFileType("zip")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            ZIP
          </button>
          <button
            onClick={() => onSelectFileType("other")}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Other
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const FileUploadButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectFileType = (type) => {
    console.log(`Selected file type: ${type}`);
    setIsModalOpen(false);
    // Handle file type logic here (e.g., open file picker for the selected type)
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="dark:bg-green-500 h-10 w-10 flex justify-center items-center rounded-full hover:bg-green-600"
      >
        Upload
      </button>

      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectFileType={handleSelectFileType}
      />
    </div>
  );
};

export default FileUploadButton;
