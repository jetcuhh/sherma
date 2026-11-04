import type { FC } from 'react';

import { c } from 'ttag';

import clsx from '@proton/utils/clsx';

import { Confetti, Mascot, useMascotReaction } from '../Layout/Mascot';
import { ACCENT_SWATCHES, Accent, useAccent } from '../Layout/Theme/accent';

const getLabels = (): Record<Accent, string> => ({
    [Accent.VIOLET]: c('Theme').t`Violet`,
    [Accent.BLUE]: c('Theme').t`Blobling blue`,
    [Accent.MINT]: c('Theme').t`Mint`,
    [Accent.CORAL]: c('Theme').t`Coral`,
    [Accent.SUN]: c('Theme').t`Sun`,
    [Accent.INK]: c('Theme').t`Ink`,
});

/** Accent color picker. The mascot hops and throws confetti when you pick one. */
export const AccentPicker: FC = () => {
    const [accent, setAccent] = useAccent();
    const { mood, burst, react } = useMascotReaction('idle');
    const labels = getLabels();

    return (
        <div className="flex flex-nowrap items-center gap-6">
            <div className="relative shrink-0">
                <Mascot mood={mood} size={64} />
                <Confetti burst={burst} />
            </div>
            <div className="sherma-accent-picker" role="radiogroup" aria-label={c('Label').t`Accent color`}>
                {Object.values(Accent).map((value) => (
                    <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={accent === value}
                        aria-label={labels[value]}
                        title={labels[value]}
                        className={clsx('sherma-accent-swatch', accent === value && 'is-selected')}
                        style={{ '--swatch-color': ACCENT_SWATCHES[value] } as React.CSSProperties}
                        onClick={() => {
                            setAccent(value);
                            react('happy');
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
