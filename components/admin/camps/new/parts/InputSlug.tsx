import { Input, inputClasses } from '../../../../general/Input';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';


type InputSlugProps = {
  handleGetSlugClick: () => void;
  fetchedSlug?: string;
  handleSlugInput: (input: string) => void;
  slug?: string;
  isEditMode?: boolean;
}

export function InputSlug({ handleGetSlugClick, fetchedSlug, handleSlugInput, slug, isEditMode }: InputSlugProps) {
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  useEffect(() => {
    setIsEditEnabled(!fetchedSlug);
  }, [fetchedSlug]);

  const handleRevert = () => {
    setIsEditEnabled(false);
    handleSlugInput(fetchedSlug ? fetchedSlug : '');
  };

  const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    handleSlugInput(value);

    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_API_ROUTE}/camping/slug-check/?${value}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.unique) {
          e.target.setCustomValidity('');
        } else {
          e.target.setCustomValidity('The slug was already used');
        }
      });
  };

  return (
    <div>
      <div className="flex gap-2">
        <label htmlFor="slug" className="text-gray-700">
          <div>
            Slug
            <span className="text-red-500 required-dot">*</span>
          </div>
        </label>

        {isEditEnabled && (
          <button
            type="button"
            onClick={() => isEditEnabled && handleGetSlugClick()}
            className="flex items-center text-sm px-2 py-1 rounded text-white bg-gray-500"
          >
            <FaAngleDoubleDown />
            Get slug from name
          </button>
        )}

        {isEditEnabled && isEditMode && (
          <button
            type="button"
            onClick={handleRevert}
            className="flex items-center text-sm px-2 py-1 rounded text-white bg-blue-500"
          >
            Revert to original slug
          </button>
        )}

        {!isEditEnabled && fetchedSlug && (
          <>
            <span className="flex gap-3 text-red-400 text-sm">Slug is already set</span>
            <button
              type="button"
              onClick={(e) => {
                setIsEditEnabled(true);
              }}
              className="text-sm px-2 py-1 rounded text-white bg-emerald-500"
            >
              Enable Editing
            </button>
          </>
        )}
      </div>

      <Input
        disabled={!isEditEnabled}
        onInput={handleInput}
        type="text"
        id="slug"
        name="slug"
        required
        minLength={4}
        maxLength={90}
        className={inputClasses}
        placeholder="atc-horna-marikova"
        value={slug || ''}
      />
    </div>
  );
}
