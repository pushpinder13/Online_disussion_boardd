import { useState, useRef } from 'react';

const RichTextEditor = ({ value, onChange, placeholder = "Write your content..." }) => {
  const [isFormatting, setIsFormatting] = useState(false);
  const editorRef = useRef(null);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleInput = () => {
    if (onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertEmoji = (emoji) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(emoji));
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    handleInput();
  };

  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉'];

  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="flex items-center space-x-2 p-3 bg-gray-50 border-b border-gray-200">
        <button
          type="button"
          onClick={() => formatText('bold')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => formatText('underline')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          title="Underline"
        >
          <u>U</u>
        </button>
        <div className="w-px h-6 bg-gray-300"></div>
        <button
          type="button"
          onClick={() => formatText('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => formatText('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          title="Numbered List"
        >
          1.
        </button>
        <div className="w-px h-6 bg-gray-300"></div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFormatting(!isFormatting)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Emojis"
          >
            😀
          </button>
          {isFormatting && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg p-2 shadow-lg z-10">
              <div className="grid grid-cols-5 gap-1">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      insertEmoji(emoji);
                      setIsFormatting(false);
                    }}
                    className="p-2 hover:bg-gray-100 rounded text-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-32 focus:outline-none"
        dangerouslySetInnerHTML={{ __html: value || '' }}
        data-placeholder={placeholder}
        style={{
          minHeight: '120px'
        }}
      />
    </div>
  );
};

export default RichTextEditor;