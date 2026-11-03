import type { FC } from 'react';

import type { MonitorDomain } from '../../../../lib/monitor/types';

type Props = { className?: string; preview: MonitorDomain; onUpsell: () => void };

/** Breach preview upsell card is disabled in this build. */
export const BreachPreviewCard: FC<Props> = () => null;
