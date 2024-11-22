"use client";


import {useEffect, useRef, useState} from "react";
import {useTheme} from "next-themes";
import {v4 as uuidv4} from 'uuid';
import {Toggle} from "@/components/ui/toggle";
import {Check, Copy, Github, Moon, RefreshCw, Sun} from "lucide-react";
import {motion} from "motion/react"
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [uuid, setUuid] = useState('')
  const {theme, setTheme} = useTheme()
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    generateUuid()
  }, [])

  const generateUuid = () => {
    setUuid(uuidv4())
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(uuid)
    setCopied(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  if (!theme) {
    return null;
  }

  return (
      <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <header className="p-4 flex justify-end space-x-0.5 ">
          <Button asChild variant="ghost" className="dark:bg-zinc-950 dark:hover:bg-zinc-900">
            <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4"/>
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Toggle
              className="dark:bg-zinc-950 dark:hover:bg-zinc-900"
              aria-label="Toggle theme"
              pressed={theme === 'dark'}
              onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
          >
            {theme === 'dark' ? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}
          </Toggle>
        </header>
        <main className="flex-grow flex items-center justify-center p-4">
          <motion.div
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5}}
              className="w-full max-w-3xl bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between space-x-4">
              <p className="text-xl font-mono text-zinc-700 dark:text-zinc-300 break-all flex-grow mr-4">{uuid}</p>
              <div className="flex space-x-2 flex-shrink-0">
                <motion.div whileTap={{scale: 0.9}}>
                  <Button onClick={generateUuid} size="icon" variant="ghost">
                    <RefreshCw className="h-4 w-4"/>
                    <span className="sr-only">Regenerate UUID</span>
                  </Button>
                </motion.div>
                <motion.div whileTap={{scale: 0.9}}>
                  <Button onClick={copyToClipboard} size="icon" variant="ghost">
                    {copied ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
                    <span className="sr-only">Copy UUID</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
  );
}
