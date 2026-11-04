import type { FC } from 'react';

import { c } from 'ttag';

import { AccentPicker } from './AccentPicker';
import { PassThemeCardList } from './PassThemeCardList';
import { SettingsPanel } from './SettingsPanel';

export const Theme: FC = () => {
    return (
        <>
            <SettingsPanel title={c('Label').t`Theme`}>
                <PassThemeCardList />
            </SettingsPanel>
            <SettingsPanel title={c('Label').t`Accent color`}>
                <AccentPicker />
            </SettingsPanel>
        </>
    );
};
