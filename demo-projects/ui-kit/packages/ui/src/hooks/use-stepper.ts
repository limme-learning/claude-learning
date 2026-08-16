"use client"

import { useCallback, useState } from "react"

export interface StepItem {
  id: string
  title: string
  description?: string
}

export interface UseStepperOptions {
  steps: StepItem[]
  initialStep?: number
}

export function useStepper({ steps, initialStep = 0 }: UseStepperOptions) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStep(stepIndex)
      }
    },
    [steps.length]
  )

  const reset = useCallback(() => {
    setCurrentStep(initialStep)
  }, [initialStep])

  return {
    currentStep,
    currentStepData: steps[currentStep],
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    reset,
    totalSteps: steps.length,
  }
}
