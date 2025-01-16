import { searchFormContext } from 'context/context';
import { useState } from 'react';

const SearchFormProvider = ({ children }) => {
  const [value, setValue] = useState('');

  return (
    <searchFormContext.Provider value={{ setValue, value }}>
      {children}
    </searchFormContext.Provider>
  );
};

export default SearchFormProvider