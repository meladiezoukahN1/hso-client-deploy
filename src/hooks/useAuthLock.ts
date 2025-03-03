"use client";

import { useState, useEffect } from "react";

interface AuthState {
  attemptsLeft: number;
  isLocked: boolean;
  unlockTime: number | null;
}

const useAuthLock = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("authState");
      return savedState
        ? JSON.parse(savedState)
        : { attemptsLeft: 5, isLocked: false, unlockTime: null };
    }
    return { attemptsLeft: 5, isLocked: false, unlockTime: null };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authState", JSON.stringify(authState));
    }
  }, [authState]);

  const handleFailedAttempt = () => {
    setAuthState((prev: AuthState) => {
      const newAttemptsLeft = prev.attemptsLeft - 1;
      if (newAttemptsLeft === 0) {
        const unlockTime = Date.now() + 10 * 60 * 1000;
        return { ...prev, attemptsLeft: 0, isLocked: true, unlockTime };
      }
      return { ...prev, attemptsLeft: newAttemptsLeft };
    });
  };

  const resetAuthState = () => {
    setAuthState({ attemptsLeft: 5, isLocked: false, unlockTime: null });
  };

  useEffect(() => {
    if (authState.isLocked && authState.unlockTime) {
      const timer = setInterval(() => {
        if (Date.now() >= authState.unlockTime!) {
          resetAuthState();
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [authState.isLocked, authState.unlockTime]);

  return { authState, handleFailedAttempt, resetAuthState };
};

export default useAuthLock;
