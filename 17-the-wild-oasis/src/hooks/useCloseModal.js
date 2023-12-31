import { useEffect } from "react"

function useCloseModal(ref, close) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("Click outside")
        close()
      }
    }
    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [close, ref])
  
}

export default useCloseModal
