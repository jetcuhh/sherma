import type { CSSProperties, FC } from 'react';

import type { ButtonLikeSize } from '@proton/atoms/Button/ButtonLike';
import { ButtonLike } from '@proton/atoms/Button/ButtonLike';
import type { PromotionButtonProps } from '@proton/components/components/button/PromotionButton/PromotionButton';

import type { UpsellRef } from '../../constants';

type UpgradeButtonProps = PromotionButtonProps<typeof ButtonLike> & {
    buttonSize?: ButtonLikeSize;
    className?: string;
    gradient?: boolean;
    inline?: boolean;
    label?: string;
    onClick?: () => void;
    path?: string;
    style?: CSSProperties;
    upsellRef: UpsellRef;
};

/** Upselling is disabled in this build: the button renders nothing. */
export const UpgradeButton: FC<UpgradeButtonProps> = () => null;
