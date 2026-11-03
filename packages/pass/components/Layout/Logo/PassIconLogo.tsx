import type { FC } from 'react';

import shermaIcon from '@proton/styles/assets/img/pass/sherma-icon.svg';

export const PassIconLogo: FC = () => (
    <div
        className="absolute inset-x-center top-custom anime-fade-in"
        style={{ '--top-custom': '1.5rem', '--anime-duration': '550ms', '--anime-delay': '150ms' }}
    >
        <img
            src={shermaIcon}
            className="pass-lobby--logo w-custom max-w-custom pointer-events-none"
            style={{ '--w-custom': '6rem', imageRendering: 'pixelated' }}
            alt="sherma logo"
        />
    </div>
);
