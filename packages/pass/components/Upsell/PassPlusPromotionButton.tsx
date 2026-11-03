import type { FC } from 'react';

import type { PromotionButtonProps } from '@proton/components/components/button/PromotionButton/PromotionButton';

type Props = Omit<PromotionButtonProps<'span'>, 'size'>;

/** Upselling is disabled in this build: the promotion button renders nothing. */
export const PassPlusPromotionButton: FC<Props> = () => null;
