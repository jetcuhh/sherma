import type { FC, PropsWithChildren } from 'react';
import { createContext } from 'react';

import noop from '@proton/utils/noop';

import type { UpsellRef } from '../../constants';
import { createUseContext } from '../../hooks/useContextFactory';
import type { MaybeNull } from '../../types/utils';
import type { UpsellType } from './UpsellingModal';

type UpsellingState = { type: UpsellType; upsellRef: UpsellRef };
type UpsellFn = (value: MaybeNull<UpsellingState>) => void;

export const UpsellingContext = createContext<MaybeNull<UpsellFn>>(null);

/** Upselling is disabled in this build: every `upsell()` dispatch is a no-op
 * and no upsell modal is ever mounted. */
export const UpsellingProvider: FC<PropsWithChildren> = ({ children }) => (
    <UpsellingContext.Provider value={noop}>{children}</UpsellingContext.Provider>
);

export const useUpselling = createUseContext(UpsellingContext);
