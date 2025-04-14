"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface InteractiveExerciseProps {
  questions: Question | Question[]
  className?: string
}

export function InteractiveExercise({ questions, className }: InteractiveExerciseProps) {
  const questionArray = Array.isArray(questions) ? questions : [questions]
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(questionArray.map(() => null))
  const [isSubmitted, setIsSubmitted] = useState(false)

  const currentQuestion = questionArray[currentQuestionIndex]

  // If there's no current question, render nothing
  if (!currentQuestion) {
    return null
  }

  const isCorrect = selectedOptions[currentQuestionIndex] === currentQuestion.correctAnswer

  const handleOptionSelect = (index: number) => {
    if (!isSubmitted) {
      const newSelectedOptions = [...selectedOptions]
      newSelectedOptions[currentQuestionIndex] = index
      setSelectedOptions(newSelectedOptions)
    }
  }

  const handleSubmit = () => {
    if (selectedOptions[currentQuestionIndex] !== null) {
      setIsSubmitted(true)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questionArray.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setIsSubmitted(false)
    }
  }

  const handleReset = () => {
    const newSelectedOptions = [...selectedOptions]
    newSelectedOptions[currentQuestionIndex] = null
    setSelectedOptions(newSelectedOptions)
    setIsSubmitted(false)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-white font-medium">{currentQuestion.question}</div>

      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={cn(
              "w-full text-left px-4 py-3 rounded-md border transition-colors",
              isSubmitted
                ? index === currentQuestion.correctAnswer
                  ? "border-green-500 bg-green-900/20 text-white"
                  : index === selectedOptions[currentQuestionIndex]
                    ? "border-red-500 bg-red-900/20 text-white"
                    : "border-white/10 bg-white/5 text-white/70"
                : selectedOptions[currentQuestionIndex] === index
                  ? "border-purple-500 bg-purple-900/20 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10",
            )}
            onClick={() => handleOptionSelect(index)}
            disabled={isSubmitted}
          >
            {option}
          </button>
        ))}
      </div>

      {isSubmitted && (
        <div
          className={cn(
            "p-4 rounded-md flex items-start",
            isCorrect ? "bg-green-900/20 border border-green-500" : "bg-red-900/20 border border-red-500",
          )}
        >
          {isCorrect ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 shrink-0" />
          )}
          <div>
            <p className="font-medium text-white">{isCorrect ? "Correct!" : "Incorrect"}</p>
            <p className="text-white/80 text-sm mt-1">{currentQuestion.explanation}</p>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        {isSubmitted ? (
          <>
            <Button onClick={handleReset}>Try Again</Button>
            {currentQuestionIndex < questionArray.length - 1 && <Button onClick={handleNext}>Next Question</Button>}
          </>
        ) : (
          <Button onClick={handleSubmit} disabled={selectedOptions[currentQuestionIndex] === null}>
            Submit Answer
          </Button>
        )}
      </div>
    </div>
  )
}
