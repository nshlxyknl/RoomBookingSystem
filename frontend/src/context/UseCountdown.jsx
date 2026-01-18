import { useEffect, useState } from "react";

export const useCountdown = (expiresAt) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiresAt) return;

    const calculate = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const totalMinutes = Math.floor(diff / (1000 * 60));
      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;

      let result = "";
      if (days > 0) result += `${days}d `;
      if (hours > 0) result += `${hours}h `;
      result += `${minutes}m`;

      setTimeLeft(result);
    };

    calculate();
    const interval = setInterval(calculate, 60 * 1000); // update every minute

    return () => clearInterval(interval);
  }, [expiresAt]);

  return timeLeft;
};
