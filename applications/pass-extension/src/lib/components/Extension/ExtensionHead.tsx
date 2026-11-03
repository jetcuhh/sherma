import type { FC } from 'react';
import { Helmet } from 'react-helmet';

export const ExtensionHead: FC<{ title: string }> = ({ title }) => (
    <Helmet>
        <link rel="icon" href={'/assets/sherma-icon.svg'} type="image/svg+xml" />
        <title>{title}</title>
    </Helmet>
);
