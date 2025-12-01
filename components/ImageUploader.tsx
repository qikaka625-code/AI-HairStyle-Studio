import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  texts: {
    uploadTitle: string;
    uploadDrag: string;
    uploadRec: string;
  };
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, texts }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  return (
    <div
      className={`relative w-full max-w-xl mx-auto border-2 border-dashed rounded-2xl p-10 transition-all duration-300 ease-in-out cursor-pointer group
        ${isDragging 
          ? 'border-brand-500 bg-brand-500/10 scale-[1.02]' 
          : 'border-zinc-700 hover:border-brand-400 bg-[#28292a] hover:bg-[#303134]'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      
      <div className="flex flex-col items-center justify-center text-center space-y-4 pointer-events-none">
        <div className={`p-4 rounded-full bg-zinc-700 group-hover:bg-zinc-600 transition-colors ${isDragging ? 'bg-brand-500/20' : ''}`}>
          <svg className="w-10 h-10 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-zinc-200">{texts.uploadTitle}</h3>
          <p className="text-zinc-400 mt-2">{texts.uploadDrag}</p>
          <p className="text-zinc-500 text-sm mt-1">{texts.uploadRec}</p>
        </div>
      </div>
    </div>
  );
};