import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { blogTags } from "../data/constant"

const TagInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
  initialTags
}) => {
  const [chips, setChips] = useState(initialTags);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, [register, name]);

  useEffect(() => {
    setValue(name, chips);
  }, [chips, setValue, name]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addChip(event.target.value.trim());
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter suggestions based on input value
    if (value.trim()) {
      const suggestions = blogTags.filter(
        (tag) => tag.toLowerCase().includes(value.toLowerCase()) && !chips.includes(tag)
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const addChip = (chipValue) => {
    if (chipValue && !chips.includes(chipValue) && blogTags.includes(chipValue)) {
      const newChips = [...chips, chipValue];
      setChips(newChips);
      setInputValue("");
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    addChip(suggestion);
  };

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  return (
    <div className="flex flex-col space-y-2">
      {
        label && <label className="text-sm" htmlFor={name}>
          {label}
        </label>
      }
      <div className="flex w-full flex-wrap gap-y-2 relative">
        {chips?.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="formInput w-full"
        />
        {filteredSuggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z-10 max-h-40 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {errors[name] && (
        <span className="formError">At least 1 tag is required</span>
      )}
    </div>
  );
};

export default TagInput;
