import { useEffect, useRef, useCallback } from "react";

// ─── Secret Unlock System ────────────────────────────────────────────────────
// Uses localStorage so the unlock persists across page reloads/sessions.
// The session sessionStorage key tracks the 15s timer per visit, while
// localStorage marks the user as permanently "unlocked".

const STORAGE_KEY = "eclipse_initiates_unlocked";
const TIMER_KEY = "eclipse_lore_time_spent";
const REQUIRED_SECONDS = 15;

export const isSecretUnlocked = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const unlockSecret = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
    // Dispatch a custom event so any mounted component can react immediately
    window.dispatchEvent(new CustomEvent("eclipse:secret_unlocked"));
  } catch {
    // Silently fail if localStorage is blocked (private mode, etc.)
  }
};

// Hook for the Lore/Mythology section — starts the 15s timer
export const useLoreTimer = () => {
  const startTime = useRef<number | null>(null);
  const accumulated = useRef<number>(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const alreadyUnlocked = useRef<boolean>(isSecretUnlocked());

  const startTimer = useCallback(() => {
    if (alreadyUnlocked.current || startTime.current !== null) return;
    startTime.current = performance.now();

    interval.current = setInterval(() => {
      if (startTime.current === null) return;
      const elapsed = (performance.now() - startTime.current) / 1000;
      const total = accumulated.current + elapsed;

      if (total >= REQUIRED_SECONDS) {
        clearInterval(interval.current!);
        interval.current = null;
        unlockSecret();
        alreadyUnlocked.current = true;
      }
    }, 500);
  }, []);

  const pauseTimer = useCallback(() => {
    if (startTime.current !== null) {
      accumulated.current += (performance.now() - startTime.current) / 1000;
      startTime.current = null;
    }
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      pauseTimer();
    };
  }, [pauseTimer]);

  return { startTimer, pauseTimer };
};

// Hook for any component that wants to know if the secret is unlocked
// and react to unlock events in real-time
export const useSecretUnlock = (onUnlock?: () => void) => {
  const unlocked = isSecretUnlocked();

  useEffect(() => {
    const handler = () => onUnlock?.();
    window.addEventListener("eclipse:secret_unlocked", handler);
    return () => window.removeEventListener("eclipse:secret_unlocked", handler);
  }, [onUnlock]);

  return { unlocked };
};
