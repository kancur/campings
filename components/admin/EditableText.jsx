import { useEffect, useRef, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { ArrowTopNotification } from './ArrowTopNotification';
import { useTransition, animated } from 'react-spring';
//import useOutsideClickDetector from '../../helpers/hooks/useOutsideClickDetector';
import OutsideClickHandler from 'react-outside-click-handler';

export function EditableText({
  onSave,
  isFocused,
  minLength,
  maxLength,
  ...props
}) {
  const [previouslySavedValue, setPreviouslySavedValue] = useState(props.text);
  const [isInputDifferentFromPrevious, setIsInputDifferentFromPrevious] =
    useState(false);
  const [inputText, setInputText] = useState(props.text);
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [wasJustSaved, setWasJustSaved] = useState(false);
  const [error, setError] = useState();
  const inputRef = useRef(null);

  //useOutsideClickDetector(inputRef, () => handleCancelEditing());

  const transition = useTransition(isInputDifferentFromPrevious, {
    from: { right: -60, opacity: 0 },
    enter: { right: 0, opacity: 1 },
    leave: { right: -60, opacity: 0 },
    //reverse: isInputDifferentFromPrevious,
  });

  useEffect(() => {
    setTimeout(() => {
      setWasJustSaved(false);
      setEditing(false);
    }, 1200);
  }, [wasJustSaved]);

  const handleInput = (e) => {
    setInputText(e.target.value);
    const isSameText = e.target.value === previouslySavedValue;
    setIsInputDifferentFromPrevious(!isSameText);
  };

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleInputLostFocus = () => {
    /*     setEditing(false);
    setInputText(previouslySavedValue) */
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave(e);
    } else if (e.key === 'Escape') {
      handleCancelEditing();
    }
  };

  const handleCancelEditing = () => {
    if (!isSaving && !wasJustSaved) {
      setEditing(false);
      setInputText(previouslySavedValue);
      setIsInputDifferentFromPrevious(false);
      setError(null);
    }
  };

  const validate = (value) => {
    if (!value && (!minLength || minLength == 0)) {
      return true;
    }

    if (minLength) {
      if (value.length >= minLength) {
        return true;
      } else {
        throw new Error(`The field must have at least ${minLength} characters`);
      }
    }

    if (maxLength) {
      if (value.length >= maxLength) {
        return true;
      } else {
        throw new Error(
          `The field must have a maximum of ${maxLength} characters`
        );
      }
    }

    return true;
  };

  const handleSave = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setError(null);

    //displaySave
    if (!isInputDifferentFromPrevious) {
      handleCancelEditing();
      return;
    }
    setIsSaving(true);

    try {
      validate(inputText);
      await onSave(inputText);
      setWasJustSaved(true);
      setPreviouslySavedValue(inputText);
      setIsInputDifferentFromPrevious(false);
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
        <OutsideClickHandler
          onOutsideClick={() => handleCancelEditing()}
        >
          <div ref={inputRef} className="flex relative w-full">
            <input
              disabled={isSaving || wasJustSaved}
              autoFocus
              onKeyDown={handleKeyDown}
              onBlur={handleInputLostFocus}
              className={`ring-2  p-1 rounded focus:outline-none w-full ${
                wasJustSaved ? 'ring-green-400' : 'ring-gray-300'
              }`}
              onChange={handleInput}
              type="text"
              value={inputText}
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
              {wasJustSaved ? (
                <span className="text-green-500">SAVED</span>
              ) : (
                <>
                  {transition(
                    (style, item) =>
                      item && (
                        <animated.div style={style} className="relative w-12">
                          <button
                            onClick={handleSave}
                            disabled={isSaving || !isInputDifferentFromPrevious}
                            className="absolute bg-green-500 px-2 py-0.5 text-white font-semibold w-12 flex justify-center items-center rounded z-0 h-full"
                          >
                            {isSaving ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              'Save'
                            )}
                          </button>
                        </animated.div>
                      )
                  )}
                  <button
                    onClick={handleCancelEditing}
                    disabled={isSaving}
                    className="bg-red-500 px-2 py-0.5 text-white font-semibold rounded disabled:bg-gray-300 z-10"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </OutsideClickHandler>
      )}
      {error && <ArrowTopNotification>{error.message}</ArrowTopNotification>}
    </div>
  );
}
