import type { FC } from 'react';

import { BLOBLING_PATHS } from '@proton/components/components/logo/BloblingLogo';
import clsx from '@proton/utils/clsx';

export type MascotMood = 'idle' | 'happy' | 'thinking' | 'sleepy' | 'sad';

type Props = {
    mood?: MascotMood;
    /** Size in px (the pixel art is square) */
    size?: number;
    className?: string;
    /** Decorative by default. Set a label when the mascot carries meaning. */
    label?: string;
};

const BODY = '#1085F2';

/** The sherma "Blobling" mascot. Mood changes the animation, and sleepy
 * closes the eyes by painting the eye whites over with the body color. */
export const Mascot: FC<Props> = ({ mood = 'idle', size = 64, className, label }) => (
    <span
        className={clsx('sherma-mascot', `sherma-mascot--${mood}`, className)}
        style={{ inlineSize: size, blockSize: size }}
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
    >
        <svg viewBox="0 0 16 16" shapeRendering="crispEdges">
            {BLOBLING_PATHS.map(({ fill, d }) => (
                <path key={fill} d={d} fill={fill} />
            ))}
            {mood === 'sleepy' && (
                <>
                    <rect x="5" y="8" width="2" height="1" fill={BODY} />
                    <rect x="9" y="8" width="2" height="1" fill={BODY} />
                </>
            )}
        </svg>
    </span>
);
