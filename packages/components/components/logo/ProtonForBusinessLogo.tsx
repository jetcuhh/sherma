import BloblingLogo from './BloblingLogo';
import type { LogoProps } from './LogoBase';

type Props = LogoProps & { withBackground?: boolean };

// `withBackground` is kept for API compatibility: the blobling mark reads well on any background
const ProtonForBusinessLogo = ({ withBackground: _withBackground, hasTitle = false, ...rest }: Props) => (
    <BloblingLogo hasTitle={hasTitle} {...rest} />
);

export default ProtonForBusinessLogo;
