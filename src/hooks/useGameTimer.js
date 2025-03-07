import { useState } from 'react';

export const useClickCounter = (targetClicks = 20, onComplete) => {
    const [clicksLeft, setClicksLeft] = useState(targetClicks);

    const incrementClick = () => {
        return new Promise((resolve) => {
            setClicksLeft(prev => {
                const newClicksLeft = prev - 1;
                const newTotal = targetClicks - newClicksLeft;
                
                if (newTotal >= targetClicks) {
                    onComplete();
                }
                
                resolve(newTotal);
                return newClicksLeft;
            });
        });
    };

    const resetCounter = () => {
        setClicksLeft(targetClicks);
    };

    return { clicksLeft, incrementClick, resetCounter };
}; 