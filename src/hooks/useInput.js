import { useState } from 'react';

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const resetValue = () => {
    setValue(initialValue);
  };

  return [value, onValueChangeHandler, resetValue];
}

export default useInput;