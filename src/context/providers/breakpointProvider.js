import { useEffect, useState } from 'react';
import { breakpointContext } from '../context';

const BreakpointProvider = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState();

  useEffect(() => {
    if (window.innerWidth >= 1200) setBreakpoint('desktop');
    else if (window.innerWidth >= 768 && window.innerWidth < 1200)
      setBreakpoint('tablet');
    else if (window.innerWidth <= 420) setBreakpoint('mobile');

    const onResize = () => {
      if (window.innerWidth >= 1200) setBreakpoint('desktop');
      else if (window.innerWidth >= 768 && window.innerWidth < 1200)
        setBreakpoint('tablet');
      else if (window.innerWidth <= 420) setBreakpoint('mobile');
    };

    window.addEventListener('resize', onResize);
  }, []);

  return (
    <breakpointContext.Provider value={{ breakpoint }}>
      {children}
    </breakpointContext.Provider>
  );
};

export default BreakpointProvider;
