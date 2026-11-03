import { useState } from 'react';

import { PASS_APP_NAME } from '@proton/shared/lib/constants';
import generateUID from '@proton/utils/generateUID';

import LogoBase, { type LogoProps } from './LogoBase';

/**
 * sherma "Blobling" glyph: 16x16 pixel-art grid scaled into the 36x36 logo box.
 */
const BLOBLING_GLYPH_TRANSFORM = 'scale(2.25)';
const BLOBLING_PATHS: { fill: string; d: string }[] = [
    { fill: '#4A4A4A', d: 'M5 0h6v1h-6z' },
    { fill: '#101010', d: 'M4 1h1v1h-1zM6 1h6v1h-6zM4 2h1v1h-1zM6 2h6v1h-6zM2 3h1v1h-1zM13 3h1v1h-1zM2 4h12v1h-12z' },
    { fill: '#2B2B2B', d: 'M5 1h1v1h-1zM5 2h1v1h-1z' },
    { fill: '#E1F0FF', d: 'M4 3h8v1h-8zM5 8h1v1h-1zM9 8h1v1h-1z' },
    { fill: '#1A1A1A', d: 'M3 5h1v1h-1zM12 5h1v1h-1zM2 6h1v1h-1zM13 6h1v1h-1zM2 7h1v1h-1zM13 7h1v1h-1zM2 8h1v1h-1zM13 8h1v1h-1zM2 9h1v1h-1zM13 9h1v1h-1zM2 10h1v1h-1zM6 10h1v1h-1zM9 10h1v1h-1zM13 10h1v1h-1zM2 11h1v1h-1zM7 11h2v1h-2zM13 11h1v1h-1zM1 12h1v1h-1zM14 12h1v1h-1zM1 13h1v1h-1zM14 13h1v1h-1zM2 14h12v1h-12zM6 8h1v1h-1zM10 8h1v1h-1zM5 9h2v1h-2zM9 9h2v1h-2z' },
    { fill: '#0B5FB8', d: 'M4 5h8v1h-8zM12 6h1v1h-1zM12 7h1v1h-1zM12 8h1v1h-1zM12 9h1v1h-1zM12 10h1v1h-1zM11 11h2v1h-2zM11 12h3v1h-3zM2 13h12v1h-12z' },
    { fill: '#1085F2', d: 'M3 6h1v1h-1zM6 6h6v1h-6zM3 7h1v1h-1zM5 7h7v1h-7zM3 8h2v1h-2zM7 8h2v1h-2zM11 8h1v1h-1zM3 9h2v1h-2zM7 9h2v1h-2zM11 9h1v1h-1zM3 10h3v1h-3zM7 10h2v1h-2zM10 10h2v1h-2zM3 11h4v1h-4zM9 11h2v1h-2zM2 12h9v1h-9z' },
    { fill: '#6FB8FF', d: 'M4 6h2v1h-2zM4 7h1v1h-1z' },
];

const BloblingGlyph = () => (
    <g transform={BLOBLING_GLYPH_TRANSFORM} shapeRendering="crispEdges">
        {BLOBLING_PATHS.map(({ fill, d }) => (
            <path key={fill} d={d} fill={fill} />
        ))}
    </g>
);

type WordmarkProps = { x: number; fontSize: number; textLength: number };

const ShermaWordmark = ({ x, fontSize, textLength }: WordmarkProps) => (
    <text
        x={x}
        y={27}
        fill="var(--logo-text-product-color, currentColor)"
        fontSize={fontSize}
        fontWeight="700"
        textLength={textLength}
        lengthAdjust="spacingAndGlyphs"
    >
        sherma
    </text>
);

const PassLogo = ({ variant = 'with-wordmark', hasTitle = true, ...rest }: LogoProps) => {
    const [uid] = useState(generateUID('logo'));

    let logoWidth: number;
    const logoHeight = 36;

    switch (variant) {
        case 'glyph-only':
            logoWidth = 36;
            break;
        case 'wordmark-only':
            logoWidth = 100;
            break;
        default:
            logoWidth = 132;
            break;
    }

    return (
        <LogoBase
            uid={uid}
            logoWidth={logoWidth}
            logoHeight={logoHeight}
            title={hasTitle ? PASS_APP_NAME : undefined}
            variant={variant}
            {...rest}
        >
            {variant !== 'wordmark-only' && <BloblingGlyph />}
            {variant !== 'glyph-only' && (
                <ShermaWordmark
                    x={variant === 'with-wordmark' ? 44 : 0}
                    fontSize={variant === 'with-wordmark' ? 26 : 28}
                    textLength={variant === 'with-wordmark' ? 86 : 98}
                />
            )}
        </LogoBase>
    );
};

export default PassLogo;
