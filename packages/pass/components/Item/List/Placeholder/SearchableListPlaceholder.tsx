import type { FC } from 'react';

import { useNavigationFilters } from '../../../Navigation/NavigationFilters';
import { Mascot } from '../../../Layout/Mascot';
import { useItems } from '../../Context/ItemsProvider';

type Props = {
    emptyListTitle: string;
    emptyListMessage?: string;
    noResultsMessage: string;
};

export const SearchableListPlaceholder: FC<Props> = ({ emptyListTitle, emptyListMessage, noResultsMessage }) => {
    const { filters } = useNavigationFilters();
    const { search } = filters;
    const { totalCount } = useItems();

    const empty = totalCount === 0;
    const hasSearch = Boolean(search.trim());

    return (
        <span className="flex flex-column items-center gap-2 color-weak text-sm p-4 text-center text-break">
            {empty || !hasSearch ? (
                <>
                    <Mascot mood="sleepy" size={56} />
                    <span>
                        <strong className="block">{emptyListTitle}</strong>
                        {emptyListMessage}
                    </span>
                </>
            ) : (
                <>
                    <Mascot mood="thinking" size={56} />
                    <span>
                        {noResultsMessage}
                        <br />"{search}"
                    </span>
                </>
            )}
        </span>
    );
};
