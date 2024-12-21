"use client"

import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        mounted ? (
            <Button size="icon" variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
            </Button>
        ) : (
            <Button size="icon" variant="ghost">
                <Moon className="h-4 w-4"/>
            </Button>
        )
    )
}
