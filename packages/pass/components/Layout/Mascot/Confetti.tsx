import type { CSSProperties, FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

type Props = {
    /** Change this value to fire a new burst */
    burst: number;
    count?: number;
};

const COLORS = ['var(--interaction-norm)', '#1085f2', '#1ea885', '#f0566a', '#f5a300'];
const DURATION_MS = 900;

/** Small flat-color confetti burst. Renders nothing when idle, and is
 * hidden entirely for people who prefer reduced motion (see _sherma.scss). */
export const Confetti: FC<Props> = ({ burst, count = 14 }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!burst) return;
        setActive(true);
        const timer = setTimeout(() => setActive(false), DURATION_MS + 100);
        return () => clearTimeout(timer);
    }, [burst]);

    const bits = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => {
                const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
                const distance = 28 + Math.random() * 28;
                return {
                    '--dx': `${Math.cos(angle) * distance}px`,
                    '--dy': `${Math.sin(angle) * distance - 10}px`,
                    '--rot': `${Math.round(Math.random() * 360)}deg`,
                    '--bit-color': COLORS[i % COLORS.length],
                } as CSSProperties;
            }),
        // a fresh random layout for every burst
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [burst, count]
    );

    if (!active) return null;

    return (
        <span className="sherma-confetti" aria-hidden>
            {bits.map((style, i) => (
                <span key={i} className="sherma-confetti-bit" style={style} />
            ))}
        </span>
    );
};
