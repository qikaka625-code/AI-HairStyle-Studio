import React, { useState, useRef } from 'react';
import { Gender, HairstyleOption, HairLength, HairColor, Language } from './types';
import { HAIRSTYLES } from './constants';
import { translations } from './translations';
import { editHairstyle } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { StyleCard } from './components/StyleCard';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  // Global State
  const [language, setLanguage] = useState<Language>('zh');
  const [userGender, setUserGender] = useState<Gender>(Gender.FEMALE);
  
  // Image State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Selection State
  const [selectedStyle, setSelectedStyle] = useState<HairstyleOption | null>(null);
  const [filterLength, setFilterLength] = useState<HairLength | 'All'>('All');
  const [filterColor, setFilterColor] = useState<HairColor | 'All'>('All');

  const t = translations[language];
  const stylesGridRef = useRef<HTMLDivElement>(null);

  // Helper to get localized names
  const getStyleName = (style: HairstyleOption) => {
    switch(language) {
      case 'zh': return style.name_zh || style.name;
      case 'vi': return style.name_vi || style.name;
      case 'th': return style.name_th || style.name;
      default: return style.name;
    }
  };

  // Handlers
  const handleImageSelected = (base64: string) => {
    setUploadedImage(base64);
    setResultImage(null); // Clear previous result on new upload
    setErrorMsg(null);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setErrorMsg(t.errorNoImage);
      return;
    }
    
    if (!selectedStyle) {
      setErrorMsg(t.errorSelect);
      // Scroll to styles if trying to generate without selection
      stylesGridRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setResultImage(null);

    try {
      // Always use strict mode for presets to keep face
      const result = await editHairstyle(uploadedImage, selectedStyle.prompt, true);
      setResultImage(result);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(t.errorGen);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setResultImage(null);
    setSelectedStyle(null);
    setErrorMsg(null);
  };

  // Filter Styles
  const filteredStyles = HAIRSTYLES.filter(s => {
    const genderMatch = s.gender === userGender || s.gender === Gender.UNISEX;
    const lengthMatch = filterLength === 'All' || s.length === filterLength;
    const colorMatch = filterColor === 'All' || s.color === filterColor;
    return genderMatch && lengthMatch && colorMatch;
  });

  return (
    <div className={`min-h-screen bg-[#131314] text-zinc-200 font-sans ${language === 'th' ? 'font-[Noto_Sans_Thai]' : ''} ${language === 'zh' ? 'font-[Noto_Sans_SC]' : ''}`}>
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e1f]/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-medium text-lg text-zinc-100 hidden sm:block">{t.title}</span>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="flex bg-[#28292a] rounded-lg p-1 border border-zinc-700">
                {['zh', 'vi', 'th', 'en'].map((lang) => (
                   <button 
                     key={lang}
                     onClick={() => setLanguage(lang as Language)} 
                     className={`px-3 py-1 rounded text-xs font-bold uppercase transition-colors ${language === lang ? 'bg-zinc-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                   >
                     {lang}
                   </button>
                ))}
             </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-24 pb-24 px-4 max-w-7xl mx-auto space-y-8">
        
        {/* Error Banner */}
        {errorMsg && (
           <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-center justify-between animate-fade-in">
             <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{errorMsg}</span>
             </div>
             <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-white">✕</button>
           </div>
        )}

        {/* SECTION 1: IMAGE COMPARISON AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[500px]">
          
          {/* LEFT: SOURCE IMAGE */}
          <div className="flex flex-col h-full bg-[#1e1e1f] rounded-3xl border-2 border-zinc-800 overflow-hidden relative group">
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-zinc-700">
               <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">{t.sourcePlaceholder}</span>
            </div>

            {uploadedImage ? (
              <>
                <div className="flex-1 w-full relative bg-[#131314]">
                  <img src={uploadedImage} alt="Source" className="w-full h-full object-contain absolute inset-0" />
                </div>
                {/* Overlay Button to change image */}
                <div className="absolute top-4 right-4 z-10">
                   <button 
                     onClick={() => document.getElementById('fileInputHidden')?.click()}
                     className="bg-black/60 hover:bg-brand-600 text-white p-2 rounded-full border border-zinc-600 transition-all shadow-lg"
                     title={t.uploadNew}
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                   </button>
                   {/* Hidden input for the overlay button */}
                   <input 
                      id="fileInputHidden"
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => handleImageSelected(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                   />
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                 <ImageUploader 
                    onImageSelected={handleImageSelected} 
                    texts={{
                      uploadTitle: t.uploadTitle,
                      uploadDrag: t.uploadDrag,
                      uploadRec: t.uploadRec
                    }}
                 />
              </div>
            )}
          </div>

          {/* RIGHT: RESULT IMAGE */}
          <div className="flex flex-col h-full bg-[#1e1e1f] rounded-3xl border-2 border-dashed border-zinc-800 overflow-hidden relative">
             <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-zinc-700">
               <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">{t.resultPlaceholder}</span>
             </div>

             {isGenerating ? (
               <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
                  <LoadingSpinner text={t.styling} />
                  <p className="text-zinc-400 text-sm animate-pulse">{t.processingDesc}</p>
               </div>
             ) : resultImage ? (
               <>
                 <div className="flex-1 w-full relative bg-[#131314]">
                   <img src={resultImage} alt="Result" className="w-full h-full object-contain absolute inset-0 animate-fade-in" />
                 </div>
                 {/* Download Button - Top Right */}
                 <div className="absolute top-4 right-4 z-20">
                    <a 
                      href={resultImage} 
                      download="hairstyle-ai-result.jpg"
                      className="flex items-center justify-center bg-black/60 hover:bg-brand-600 text-white p-2 rounded-full border border-zinc-600 transition-all shadow-lg"
                      title={t.saveImage}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </a>
                 </div>
               </>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-40">
                  <div className="w-20 h-20 rounded-full bg-[#28292a] mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-300 mb-2">{t.resultPlaceholder}</h3>
                  <p className="text-zinc-500 max-w-xs">{t.resultPlaceholderDesc}</p>
               </div>
             )}
          </div>
        </div>

        {/* SECTION 2: CONTROLS & GRID */}
        <div className="bg-[#1e1e1f] rounded-3xl border border-zinc-800 p-6 sm:p-8" ref={stylesGridRef}>
           
           {/* Top Bar: Gender & Filters */}
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-zinc-800 pb-8">
              
              {/* Gender */}
              <div className="flex flex-col space-y-2">
                 <label className="text-xs font-bold text-zinc-500 uppercase">{t.selectStyle}</label>
                 <div className="flex bg-[#28292a] rounded-lg p-1 border border-zinc-700">
                    {Object.values(Gender).filter(g => g !== Gender.UNISEX).map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                           setUserGender(g);
                           setSelectedStyle(null);
                        }}
                        className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${userGender === g ? 'bg-brand-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
                      >
                        {t.gender[g]}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase">{t.filterLength}</label>
                    <div className="flex gap-2">
                      <button onClick={() => setFilterLength('All')} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${filterLength === 'All' ? 'bg-zinc-700 text-white border-zinc-600' : 'text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}>{t.filterAll}</button>
                      {Object.values(HairLength).map(l => (
                        <button key={l} onClick={() => setFilterLength(l)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${filterLength === l ? 'bg-zinc-700 text-white border-zinc-600' : 'text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}>{t.lengths[l]}</button>
                      ))}
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase">{t.filterColor}</label>
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => setFilterColor('All')} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${filterColor === 'All' ? 'bg-zinc-700 text-white border-zinc-600' : 'text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}>{t.filterAll}</button>
                      {Object.values(HairColor).map(c => (
                        <button key={c} onClick={() => setFilterColor(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${filterColor === c ? 'bg-zinc-700 text-white border-zinc-600' : 'text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}>{t.colors[c]}</button>
                      ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Styles Grid */}
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-20">
              {filteredStyles.length > 0 ? (
                filteredStyles.map(style => (
                  <StyleCard 
                    key={style.id} 
                    styleOption={style} 
                    isSelected={selectedStyle?.id === style.id}
                    lang={language}
                    onSelect={(s) => setSelectedStyle(s)}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-xl">
                   <p>{t.noStyles}</p>
                   <button onClick={() => {setFilterLength('All'); setFilterColor('All');}} className="text-brand-400 mt-2 hover:underline">{t.clearFilters}</button>
                </div>
              )}
           </div>

           {/* Floating Action Bar */}
           <div className="fixed bottom-6 left-0 right-0 z-40 px-4">
              <div className="max-w-2xl mx-auto bg-[#1e1e1f]/90 backdrop-blur-xl border border-zinc-700 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 ring-1 ring-white/5">
                 <div className="hidden sm:block">
                   {selectedStyle ? (
                     <div className="flex flex-col">
                       <span className="text-xs text-zinc-400 uppercase font-bold">{t.selected}</span>
                       <span className="font-bold text-white truncate max-w-[200px]">{getStyleName(selectedStyle)}</span>
                     </div>
                   ) : (
                     <span className="text-zinc-500 text-sm">{t.selectOrType}</span>
                   )}
                 </div>
                 
                 <button
                   onClick={handleGenerate}
                   disabled={isGenerating || !selectedStyle || !uploadedImage}
                   className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2
                     ${(isGenerating || !selectedStyle || !uploadedImage)
                       ? 'bg-zinc-700 cursor-not-allowed text-zinc-500 shadow-none' 
                       : 'bg-brand-600 hover:bg-brand-500 shadow-brand-500/20'
                     }`}
                 >
                   {isGenerating ? (
                     <>
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                       <span>{t.styling}</span>
                     </>
                   ) : (
                     <>
                        <span>{t.generate}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                     </>
                   )}
                 </button>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
};

export default App;