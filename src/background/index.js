const initializeStorage = () => {
  chrome.storage.local.set({ 
    HUGGING_FACE_TOKEN: process.env.HUGGING_FACE_API_KEY,
  });
};

initializeStorage();