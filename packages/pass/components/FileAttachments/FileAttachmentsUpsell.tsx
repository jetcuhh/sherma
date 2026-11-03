import type { FC } from 'react';

import { c } from 'ttag';

import { Card } from '../Layout/Card/Card';

type Props = {
    /** Kept for call-site compatibility (unused: upselling is disabled in this build). */
    isPassEssentials: boolean;
    onUpsell: () => void;
};

/** Rendered in place of the upload button when the user cannot use storage.
 * Existing files are still rendered (e.g. in case of downgrade). Upselling is
 * disabled in this build, so only a neutral notice is shown. */
export const FileAttachmentsUpsell: FC<Props> = () => (
    <Card className="mx-4 mb-4" type="primary">
        {c('Pass_file_attachments').t`File attachments are not supported in your plan.`}
    </Card>
);
