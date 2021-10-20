import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

export function EditableText({ onSave, ...props }) {
  const [previouslySavedValue, setPreviouslySavedValue] = useState(props.text);
  const [isInputDifferentFromPrevious, setIsInputDifferentFromPrevious] = useState(false);
  const [inputText, setInputText] = useState(props.text);
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setTimeout(() => {
      setIsSaved(false);
      setEditing(false);
    }, 1200);
  }, [isSaved]);

  const handleInput = (e) => {
    setInputText(e.target.value)
    const isSameText = (e.target.value === previouslySavedValue)
    setIsInputDifferentFromPrevious(!isSameText)
 
  }

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleInputLostFocus = () => {};

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleCancelEditing = () => {
    setEditing(false);
    setInputText(previouslySavedValue);
    setError(null);
  };

  const handleSave = async () => {
    setError(null);

    //displaySave
    if (!isInputDifferentFromPrevious) {
      handleCancelEditing();
      return;
    }
    setIsSaving(true);

    try {
      await onSave(inputText);
      setIsSaved(true);
      setPreviouslySavedValue(inputText);
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setIsSaving(false);
  };

  return (
    <div className="w-full relative">
      {!editing ? (
        <p className="flex-grow p-1" onClick={handleStartEditing}>
          {inputText}
        </p>
      ) : (
        <div className="flex relative w-full">
          <input
            autoFocus
            onKeyDown={handleKeyDown}
            onBlur={handleInputLostFocus}
            className={`ring-2  p-1 rounded focus:outline-none w-full ${
              isSaved ? 'ring-green-400' : 'ring-gray-300'
            }`}
            onChange={handleInput}
            type="text"
            value={inputText}
          />
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
            {isSaved ? (
              <span className="text-green-500">SAVED</span>
            ) : (
              <>
                {isInputDifferentFromPrevious && (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-green-500 px-2 py-0.5 text-white font-semibold w-12 flex justify-center items-center rounded"
                  >
                    {isSaving ? <FaSpinner className="animate-spin" /> : 'Save'}
                  </button>
                )}
                <button
                  onClick={handleCancelEditing}
                  disabled={isSaving}
                  className="bg-red-500 px-2 py-0.5 text-white font-semibold rounded disabled:bg-gray-300"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {error && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-red-600 p-2 text-white rounded shadow-md z-10 select-none">
          Saving failed. Check console for error details.
          <div className="arrow-up absolute left-1/2 -top-2 -translate-x-1/2 border-red-600 z-30"></div>
        </div>
      )}
    </div>
  );
}
