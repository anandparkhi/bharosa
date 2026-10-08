import { useCallback, useEffect, useRef, useState } from "react";

/** Cancel obsolete requests on navigation, language change, or a new request. */
export function useTask<T>(language: string) {
  const active = useRef<AbortController | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const reset = useCallback(() => {
    active.current?.abort();
    active.current = null;
    setResult(null);
    setBusy(false);
    setFailed(false);
  }, []);
  useEffect(() => {
    reset();
    return () => active.current?.abort();
  }, [language, reset]);
  const run = async (task: (signal: AbortSignal) => Promise<T>) => {
    active.current?.abort();
    const controller = new AbortController();
    active.current = controller;
    setResult(null);
    setBusy(true);
    setFailed(false);
    try {
      const value = await task(controller.signal);
      if (!controller.signal.aborted) setResult(value);
    } catch {
      if (!controller.signal.aborted) setFailed(true);
    } finally {
      if (!controller.signal.aborted) setBusy(false);
    }
  };
  return { result, busy, failed, run, reset };
}
