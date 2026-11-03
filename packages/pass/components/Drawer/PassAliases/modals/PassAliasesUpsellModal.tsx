import type { FC } from 'react';

import type { ModalStateProps } from '@proton/components/components/modalTwo/useModalState';
import type { UPSELL_COMPONENT } from '@proton/shared/lib/constants';

interface Props {
    modalProps: ModalStateProps;
    upsellComponent?: UPSELL_COMPONENT;
}

/** Upselling is disabled in this build: the alias upsell modal renders nothing. */
const PassAliasesUpsellModal: FC<Props> = () => null;

export default PassAliasesUpsellModal;
