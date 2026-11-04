import { useCallback, useEffect, useRef, useState } from 'react';

import type { MascotMood } from './Mascot';

/** Drives a mascot's mood: `react('happy')` plays the mood for a moment, then
 * returns to the resting mood. `burst` increments on each reaction so it can
 * also trigger confetti. */
export const useMascotReaction = (rest: MascotMood = 'idle', durationMs = 900) => {
    const [mood, setMood] = useState<MascotMood>(rest);
    const [burst, setBurst] = useState(0);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const react = useCallback(
        (next: MascotMood = 'happy') => {
            clearTimeout(timer.current);
            setMood(next);
            setBurst((n) => n + 1);
            timer.current = setTimeout(() => setMood(rest), durationMs);
        },
        [rest, durationMs]
    );

    useEffect(() => () => clearTimeout(timer.current), []);

    return { mood, burst, react };
};
