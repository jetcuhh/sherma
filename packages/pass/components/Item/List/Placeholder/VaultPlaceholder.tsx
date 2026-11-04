import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { c } from 'ttag';

import { selectAllVaults } from '../../../../store/selectors/shares';
import { Mascot } from '../../../Layout/Mascot';
import { useNavigationFilters } from '../../../Navigation/NavigationFilters';
import { useItems } from '../../Context/ItemsProvider';
import { NoVaultPlaceholder } from './NoVaultPlaceholder';
import { QuickActionsPlaceholder } from './QuickActionsPlaceholder';

export const VaultPlaceholder: FC = () => {
    const { filters } = useNavigationFilters();
    const { search } = filters;
    const { totalCount } = useItems();

    const empty = totalCount === 0;
    const hasSearch = Boolean(search.trim());

    /** May only happen if the organization doesn't allow vault creation
     * and default vault is not automatically created */
    const hasNoVault = useSelector(selectAllVaults).length === 0;
    if (hasNoVault) return <NoVaultPlaceholder />;

    if (empty) return <QuickActionsPlaceholder />;

    return (
        <span className="flex flex-column items-center gap-2 color-weak text-sm p-4 text-center text-break">
            <Mascot mood={hasSearch ? 'thinking' : 'sleepy'} size={56} />
            {hasSearch ? (
                <span>
                    {c('Warning').t`No items matching`}
                    <br />"{search}"
                </span>
            ) : (
                c('Warning').t`No items`
            )}
        </span>
    );
};
