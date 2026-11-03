import type { FC, PropsWithChildren } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { c } from 'ttag';

import { PLANS } from '@proton/payments/core/constants';
import { PASS_SHORT_APP_NAME } from '@proton/shared/lib/constants';
import { PASS_DOWNLOAD_URL } from '@proton/shared/lib/pass/constants';
import noop from '@proton/utils/noop';

import onboardingExtension from '../../../assets/desktop-onboarding/onboarding-extension.svg';
import { useFeatureFlagVariant } from '../../../hooks/useFeatureFlagVariant';
import { usePassExtensionInstalled } from '../../../hooks/usePassExtensionInstalled';
import { useSelectorOnce } from '../../../hooks/useSelectorOnce';
import { selectAllItems } from '../../../store/selectors/items';
import { PassFeature } from '../../../types/api/features';
import { SpotlightMessage } from '../../../types/worker/spotlight';
import { prop } from '../../../utils/fp/lens';
import { usePassCore } from '../../Core/PassCoreProvider';
import { AspectRatioBox } from '../../Utils/AspectRatioBox';
import { OnboardingLockSetup } from '../OnboardingLockSetup';
import { OnboardingModal } from '../OnboardingModal';
import { OnboardingThemeSelect } from '../OnboardingThemeSelect';
import type { AvailablePlans } from './OnboardingContext';
import {
    OnboardingContext,
    type OnboardingContextValue,
    type OnboardingStep,
    OnboardingType,
} from './OnboardingContext';

export const WelcomeProvider: FC<PropsWithChildren> = ({ children }) => {
    const { spotlight } = usePassCore();
    const hasExtension = usePassExtensionInstalled(!DESKTOP_BUILD);
    const welcomeUnlimitedVariant = useFeatureFlagVariant(PassFeature.PassOnboardingUpgrade);

    /* For A/B test: variant A shows Pass Plus by default, variant B shows Proton Unlimited */
    const defaultPlan = welcomeUnlimitedVariant?.name === 'A' ? PLANS.PASS : PLANS.BUNDLE;
    const [selected, setSelected] = useState<AvailablePlans>(defaultPlan);
    const [enabled, setEnabled] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [completed, setCompleted] = useState<string[]>([]);

    const hasItems = useSelectorOnce(selectAllItems).length > 0;

    const steps = useMemo<OnboardingStep[]>(() => {
        if (!enabled) return [];

        const steps: OnboardingStep[] = [
            {
                key: 'look-and-feel',
                shortTitle: c('Label').t`Select your theme`,
                actionText: c('Label').t`Select theme`,
                description: () => c('Label').t`Choose your preferred look and feel.`,
                group: c('Label').t`Personalize`,
                title: c('Label').t`Make it your own.`,
                component: OnboardingThemeSelect,
            },
        ];

        if (hasItems) {
            steps.push({
                key: 'unlock',
                shortTitle: c('Label').t`Choose unlock method`,
                component: () => (
                    <div className="pass-onboarding-modal--lock">
                        <p className="text-bold mt-0">{c('Label').t`Unlock with:`}</p>
                        <OnboardingLockSetup />
                    </div>
                ),
                description: () => (
                    <>
                        {c('Label')
                            .t`For security reasons, ${PASS_SHORT_APP_NAME} automatically locks itself after 10 minutes of inactivity.`}
                        {DESKTOP_BUILD && (
                            <div className="mt-4">
                                {c('Label')
                                    .t`You can choose between PIN code, biometrics, or your account password to unlock.`}
                            </div>
                        )}
                    </>
                ),
                group: c('Label').t`Security`,
                title: c('Label').t`How to unlock ${PASS_SHORT_APP_NAME}`,
            });
        }

        /* Upsell step disabled in this build */

        if (!hasExtension || DESKTOP_BUILD) {
            steps.push({
                key: 'extension',
                shortTitle: c('Label').t`Install extension`,
                action: () => window.open(PASS_DOWNLOAD_URL, '_blank'),
                actionText: c('Label').t`Install and continue`,
                component: () => (
                    <AspectRatioBox width={300} height={190}>
                        <img src={onboardingExtension} className="w-full" alt="" />
                    </AspectRatioBox>
                ),
                description: () => c('Label').t`Get the extension for your browser.`,
                group: c('Label').t`Browse faster, smarter`,
                title: c('Label').t`Your passwords. Everywhere.`,
            });
        }

        return steps;
    }, [enabled, hasItems, hasExtension]);

    const handleModalClose = useCallback(() => {
        setIsActive(false);
        void spotlight.acknowledge(SpotlightMessage.WELCOME_MODAL);
    }, [spotlight]);

    const context = useMemo<OnboardingContextValue>(
        () => ({
            acknowledge: () => {
                setEnabled(false);
                setIsActive(false);
                setCompleted([]);
                void spotlight.acknowledge(SpotlightMessage.WELCOME);
            },
            launch: () => {
                setEnabled(true);
                setIsActive(true);
            },
            markCompleted: (step: string) => {
                setCompleted((prev) => Array.from(new Set(prev.concat(step))));
            },
            enabled,
            isActive,
            steps,
            completed,
            type: OnboardingType.WELCOME,
            selected,
            setSelected,
        }),
        [enabled, isActive, steps, completed, selected, spotlight]
    );

    useEffect(() => {
        (async () => {
            const shouldShow = (await spotlight.check(SpotlightMessage.WELCOME)) ?? false;
            if (!shouldShow) return;

            const shouldOpenModal = (await spotlight.check(SpotlightMessage.WELCOME_MODAL)) ?? false;

            setEnabled(true);
            setIsActive(shouldOpenModal);
        })().catch(noop);
    }, []);

    useEffect(() => {
        const stepKeys = steps.map(prop('key'));
        setCompleted((completed) => completed.filter((step) => stepKeys.includes(step)));
    }, [steps]);

    return (
        <OnboardingContext.Provider value={context}>
            {children}
            {enabled && isActive && <OnboardingModal open onClose={handleModalClose} />}
        </OnboardingContext.Provider>
    );
};
