import { useEffect } from "react"

export function useKey(key,action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          action()
          console.log("CLOSING");
        }
      }
      document.addEventListener("keydown", callback)
      return () => document.removeEventListener("keydown", callback)
    },
    [action,key]
  )
}
