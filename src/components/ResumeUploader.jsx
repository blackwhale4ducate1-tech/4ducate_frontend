import React, { useState, useRef } from 'react';
import axios from 'axios';
// import { BASE_URL } from '../env';
import { BASE_URL } from '../../env';
import { useTheme } from '../contexts/ThemeContext';

const ResumeUploader = ({ onUploadSuccess }) => {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const inputRef = useRef();
  const { isDark } = useTheme();

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file) => {
    if (file.type !== 'application/pdf') {
      return setError('Only PDF files are allowed');
    }
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post(`${BASE_URL}/api/resumes/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        }
      });

      onUploadSuccess(data);
      setProgress(100);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    }
  };

  const openFileDialog = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          dragging ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          type="file"
          accept="application/pdf"
          ref={inputRef}
          className="hidden"
          onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
        />
        <p className="text-center text-sm md:text-base font-medium text-gray-600 dark:text-gray-300">
          Drag & drop your PDF resume here or click to select
        </p>
        {progress > 0 && progress < 100 && (
          <div className="w-full mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default ResumeUploader;
