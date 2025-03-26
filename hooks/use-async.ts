"use client"

import { useState, useCallback, useEffect } from "react"

interface AsyncState<T> {
  status: "idle" | "pending" | "success" | "error"
  data: T | null
  error: Error | null
}

type AsyncFn<T, Args extends any[]> = (...args: Args) => Promise<T>

export function useAsync<T, Args extends any[] = any[]>(
  asyncFunction: AsyncFn<T, Args>,
  immediate = false,
  initialArgs?: Args,
) {
  const [state, setState] = useState<AsyncState<T>>({
    status: "idle",
    data: null,
    error: null,
  })

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the function is not recreated on each render.
  const execute = useCallback(
    async (...args: Args) => {
      setState({ status: "pending", data: null, error: null })
      try {
        const response = await asyncFunction(...args)
        setState({ status: "success", data: response, error: null })
        return response
      } catch (error) {
        setState({
          status: "error",
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
        })
        throw error
      }
    },
    [asyncFunction],
  )

  // Call execute if immediate is true and we have initialArgs
  useEffect(() => {
    if (immediate && initialArgs) {
      execute(...initialArgs)
    }
  }, [execute, immediate, initialArgs])

  return {
    execute,
    status: state.status,
    data: state.data,
    error: state.error,
    isIdle: state.status === "idle",
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
  }
}

