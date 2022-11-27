import { useEffect } from "react"


const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Bike Hut`;
    }, [title])
}

export default useTitle