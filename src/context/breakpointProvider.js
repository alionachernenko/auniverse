import { useState } from 'react'
import breakpointContext from './contextBr'

const BreakpointProvider = ({children}) => {
    const [breakpoint, setBreakpoint] = useState(document.documentElement.clientWidth)

    const onResize = () => {
        setBreakpoint(document.documentElement.clientWidth)    
    }

    window.addEventListener('resize', onResize)

    return(
        <breakpointContext.Provider value={{breakpoint}}>
            {children}
        </breakpointContext.Provider>
        )
}

export default BreakpointProvider