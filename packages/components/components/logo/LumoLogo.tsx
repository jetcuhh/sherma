import BloblingLogo, { BLOBLING_PATHS } from './BloblingLogo';
import type { LogoProps } from './LogoBase';

/**
 * Blobling mark framed for the drawer icon's viewBox ("-1.61 1.99 24.42 24.42"):
 * the 16x16 pixel grid is scaled to fill that box.
 */
export const LumoCatMark = () => (
    <g transform="translate(-1.61 1.99) scale(1.526)" shapeRendering="crispEdges">
        {BLOBLING_PATHS.map(({ fill, d }) => (
            <path key={fill} d={d} fill={fill} />
        ))}
    </g>
);

const LumoLogo = (props: LogoProps) => <BloblingLogo {...props} />;

export default LumoLogo;
