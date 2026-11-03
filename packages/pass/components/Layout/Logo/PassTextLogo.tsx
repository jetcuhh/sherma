import { type ComponentPropsWithoutRef, useState } from 'react';

import clsx from '@proton/utils/clsx';
import generateUID from '@proton/utils/generateUID';

type Props = ComponentPropsWithoutRef<'svg'>;

export const PassTextLogo = ({ className, ...rest }: Props) => {
    // This logo can be several times in the view, ids has to be different each time
    const [uid] = useState(generateUID('logo'));

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 92 27.6"
            fill="none"
            className={clsx('logo with-wordmark', className)}
            aria-labelledby={`${uid}-title`}
            {...rest}
        >
            <title id={`${uid}-title`}>sherma</title>
            <text y="22.5" fontSize="26" fontWeight="700" textLength="90" lengthAdjust="spacingAndGlyphs">
                sherma
            </text>
        </svg>
    );
};
