import BloblingLogo from './BloblingLogo';
import type { LogoProps } from './LogoBase';

type Color = 'brand' | 'invert';

interface Props extends LogoProps {
    color?: Color;
}

const ProtonLogo = ({ color = 'brand', ...rest }: Props) => <BloblingLogo invert={color === 'invert'} {...rest} />;

export default ProtonLogo;
