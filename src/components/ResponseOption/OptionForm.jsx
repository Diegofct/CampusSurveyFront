import React, { useState } from 'react';

const OptionForm = () => {
  const [options, setOptions] = useState([]);

  const handleCreateOption = () => {
    setOptions([...options, { text: '' }]);
  };

  return (
    <div className="mt-4">
      <h6 className="mt-2 font-semibold">Options</h6>
      <button
        onClick={handleCreateOption}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Option
      </button>

      {options.length > 0 &&
        options.map((option, optIdx) => (
          <div key={optIdx} className="mt-2">
            <p>Option {optIdx + 1}</p>
          </div>
        ))}
    </div>
  );
};

export default OptionForm;
