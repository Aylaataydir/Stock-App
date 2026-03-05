import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeTheme } from "@/features/themeSlice";


const useTheme = () => {

    const theme = useSelector((state) => state.theme.theme)
    const dispatch = useDispatch()
 
    useEffect(() => {

        const root = window.document.documentElement
        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme)
            return;
        }

        root.classList.add(theme)

    },[theme])

    return { theme, setTheme: (newTheme) => dispatch(changeTheme(newTheme))}  // buraya bak bir daha settheme lar ne anlama geliyor

}

export default useTheme