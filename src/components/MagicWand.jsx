import React, { useState, useEffect, useCallback, memo } from 'react';
import { AlertTriangle } from 'lucide-react';
const MagicWindIcon = memo(() => (
  <img 
    src={chrome.runtime.getURL('icons/icon48.png')} 
    alt="MagicWand"
    width="36"
    height="36"
  />
));

MagicWindIcon.displayName = 'MagicWandIcon';


const MAX_CHAR_LIMIT = 512;
const TRUNCATE_MESSAGE = '... (text truncated due to length)';

const MagicWand = () => {
  const [selector, setSelector] = useState({
    visible: false,
    expanded: false,
    x: 0,
    y: 0,
    text: '',
    summary: '',
    loading: false,
    copied: false
  });

  const [displayText, setDisplayText] = useState('');

  const calculatePosition = useCallback((selection) => {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get scroll position
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate initial position (top-left of selection)
    let x = rect.left + scrollX;
    let y = rect.top + scrollY;
    
    // Adjust position to stay within viewport
    // Add small offset from the text (10px)
    x = Math.max(10, x - 30);
    y = Math.max(10, y - 30);
    
    // Prevent popup from going off-screen
    if (x + 300 > viewportWidth + scrollX) {
      x = viewportWidth + scrollX - 300 - 10; // 10px margin from right edge
    }
    
    if (y + 220 > viewportHeight + scrollY) {
      y = rect.top + scrollY - 220 - 10; // Position above text if not enough space below
    }

    return { x, y };
  }, []);

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      const position = calculatePosition(selection);
      setSelector(prev => ({
        ...prev,
        visible: true,
        expanded: false,
        x: position.x,
        y: position.y,
        text: selectedText,
        summary: ''
      }));
    } else {
      setSelector(prev => ({ ...prev, visible: false }));
    }
  }, [calculatePosition]);

  const getSummary = async (text) => {
    try {
        const formattedPrompt = `[INST] Provide a clear and concise summary of this text in 2-3 sentences:

${text}
[/INST]`;

        const response = await fetch(
            process.env.HUGGING_FACE_API_URL,
            {
                headers: {
                    "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: formattedPrompt,
                    parameters: {
                        max_length: 100,
                        min_length: 20,
                        temperature: 0.1,
                        do_sample: false,
                        top_k: 50,
                        top_p: 0.85,
                        repetition_penalty: 1.2
                    },
                }),
                method: "POST",
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.error('API Error:', error);
            throw new Error(error.error || 'Failed to generate response');
        }

        const result = await response.json();
        if (Array.isArray(result) && result[0]) {
            const generatedText = result[0].generated_text;
            
            // Clean up the response
            let summary = generatedText
                // Remove the original instruction and text, but preserve first character of actual response
                .replace(/\[INST\].*?\[\/INST\]\s*/s, '')
                // Remove any remaining [INST] or [/INST] tags
                .replace(/\[INST\]|\[\/INST\]/g, '')
                // Remove any leading/trailing whitespace
                .trim();
                
            // If summary is empty after cleanup, throw error
            if (!summary) {
                throw new Error('No valid summary generated');
            }

            return summary;
        }

        throw new Error('Invalid response format from API');
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to generate response. Please try again.');
    }
  };

  const getSummaryWithRetry = async (text, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await getSummary(text);
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
    }
  };

  const handleMagicClick = async () => {
    if (!selector.text) {
      setSelector(prev => ({
        ...prev,
        expanded: true,
        loading: false,
        summary: 'No text selected to summarize.'
      }));
      return;
    }

    // Add text truncation
    let processedText = selector.text;
    let isTruncated = false;
    if (processedText.length > MAX_CHAR_LIMIT) {
      processedText = processedText.substring(0, MAX_CHAR_LIMIT - TRUNCATE_MESSAGE.length) + TRUNCATE_MESSAGE;
      isTruncated = true;
    }

    setSelector(prev => ({ ...prev, expanded: true, loading: true }));
    try {
      const summary = await getSummaryWithRetry(processedText);
      setSelector(prev => ({ 
        ...prev, 
        summary: isTruncated ? summary + ' (Summary based on truncated text)' : summary,
        loading: false 
      }));
      typeText(summary);
    } catch (error) {
      console.error('Summarization error:', error);
      setSelector(prev => ({
        ...prev,
        summary: error.message,
        loading: false
      }));
      typeText(error.message);
    }
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if click is outside both the popup and the selected text
      const selection = window.getSelection();
      const isClickInsideSelection = selection.rangeCount > 0 && 
        selection.getRangeAt(0).getBoundingClientRect().contains(event.clientX, event.clientY);
      
      if (selector.visible && 
          !event.target.closest('.ai-summary-popup') && 
          !isClickInsideSelection) {
        setSelector(prev => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selector.visible]);

  useEffect(() => {
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, [handleSelection]);

  const typeText = useCallback((text, speed = 20) => {
    setDisplayText(text.charAt(0));
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }, []);

  if (!selector.visible) return null;

  return (
    <div 
      className="ai-summary-popup"
      style={{
        position: 'absolute',
        left: `${selector.x}px`,
        top: `${selector.y}px`,
        zIndex: 2147483647
      }}
    >
      {!selector.expanded ? (
        <div className="popup-icon" onClick={handleMagicClick}>
          <MagicWindIcon />
        </div>
      ) : (
        <div className="popup-content">
          <div className="popup-header">
            <div className="header-content">
              <MagicWindIcon />
              <span>MagicWand Summary</span>
            </div>
            <button 
              className="close-button"
              onClick={() => setSelector(prev => ({ ...prev, visible: false }))}
            >
              ×
            </button>
          </div>
          {selector.loading ? (
            <div className="loading-message">
              <div className="spinner" />
              <span>Generating AI summary...</span>
            </div>
          ) : (
            <>
              <div className="summary-text">
                {displayText}
                {selector.summary != displayText ? <span className="typing-cursor"></span> : null}
              </div>
              <div className="popup-footer">
                <div className="stats">
                    <span className="word-count">
                       Summary: {selector.summary.split(' ').length} words
                    </span>
                    <span className="char-count">
                      • Selected: {selector.text.length} chars
                    </span>
                </div>
                <div className="safety-notice">
                <AlertTriangle  size={11}/>
                MagicWand may give some wrong answers. Check every answer
                 </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(MagicWand);