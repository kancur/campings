import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';
import OutsideClickHandler from 'react-outside-click-handler';
import ButtonAdmin from './ButtonAdmin';
import { ArrowTopNotification } from '../../general/ArrowTopNotification';

type EditableTextProps = {
  onSave: (value: string) => void;
  text: string;
  isFocused?: boolean;
  minLength?: number;
  maxLength?: number;
  props?: any;
};

/**
 * An inline editable text element
 */
export default function EditableText({
  onSave,
  isFocused,
  minLength,
  maxLength,
  text,
  ...props
}: EditableTextProps) {
  const [previouslySavedValue, setPreviouslySavedValue] = useState(text);
  const [isInputDifferentFromPrevious, setIsInputDifferentFromPrevious] = useState(false);
  const [inputText, setInputText] = useState(text);
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [wasJustSaved, setWasJustSaved] = useState(false);
  const [error, setError] = useState<null | Error>(null);

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const validate = (value: string) => {
    // empty value in text field is valid if minlength is not set or zero
    if (!value && (!minLength || minLength == 0)) {
      return true;
    }

    // if minlength is set and value is shorter than minlength, it is invalid
    if (minLength) {
      if (value.length >= minLength) {
        return true;
      } else {
        throw new Error(`The field must have at least ${minLength} characters`);
      }
    }

    // if maxlength is set and value is longer than maxlength, it is invalid
    if (maxLength) {
      if (value.length >= maxLength) {
        return true;
      } else {
        throw new Error(`The field must have a maximum of ${maxLength} characters`);
      }
    }

    return true;
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (e) {
      e.preventDefault();
    }
    setError(null);

    if (!isInputDifferentFromPrevious) {
      handleCancelEditing();
      return;
    }
    setIsSaving(true);

    try {
      validate(inputText);
      onSave(inputText);
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
        <div className="flex relative">
          <p className="flex-grow p-1" onClick={handleStartEditing}>
            {inputText}
          </p>
        </div>
      ) : (
        <OutsideClickHandler onOutsideClick={() => handleCancelEditing()}>
          <div className="flex relative w-full">
            <input
              disabled={isSaving || wasJustSaved}
              autoFocus
              onKeyDown={handleKeyDown}
              onBlur={handleInputLostFocus}
              className={`ring-2  p-1 rounded focus:outline-none w-full ${
                wasJustSaved ? 'ring-emerald-400' : 'ring-gray-300'
              }`}
              onChange={handleInput}
              type="text"
              value={inputText}
            />
            <div className="absolute right-0.5 top-1/2 -translate-y-1/2 flex gap-1">
              {wasJustSaved ? (
                <span className="text-emerald-500">SAVED</span>
              ) : (
                <>
                  {transition(
                    (style, item) =>
                      item && (
                        <animated.div style={style} className="relative w-12">
                          <ButtonAdmin
                            onClick={handleSave}
                            disabled={isSaving || !isInputDifferentFromPrevious}
                            className="absolute bg-emerald-500 w-12 z-0 h-full"
                          >
                            {isSaving ? <FaSpinner className="animate-spin" /> : 'Save'}
                          </ButtonAdmin>
                        </animated.div>
                      )
                  )}
                  <ButtonAdmin
                    className="bg-red-500"
                    onClick={handleCancelEditing}
                    disabled={isSaving}
                  >
                    Cancel
                  </ButtonAdmin>
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
