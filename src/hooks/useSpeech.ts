import { useEffect, useRef } from 'react'

export const useSpeech = (message: string) => {
  const speech = useRef<SpeechSynthesisUtterance>(new SpeechSynthesisUtterance())
  useEffect(() => {
    speech.current.text = message
    speech.current.volume = 1
    speech.current.rate = 1 
    speech.current.pitch = 1
  }, [message])
  const read = () => speechSynthesis.speak(speech.current)
  return read
}
