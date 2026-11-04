import type { FC, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { c } from 'ttag';

import { Button } from '@proton/atoms/Button/Button';
import type { ButtonProps } from '@proton/atoms/Button/Button';
import type { ButtonLikeShape } from '@proton/atoms/Button/ButtonLike';
import { Tooltip } from '@proton/atoms/Tooltip/Tooltip';
import { IcSquares } from '@proton/icons/icons/IcSquares';
import clsx from '@proton/utils/clsx';

import { useCopyToClipboard } from '../Settings/Clipboard/ClipboardProvider';

type Props = ButtonProps & {
    value: string;
    className?: string;
    onCopy?: () => void;
    tooltipText?: string;
    shape?: ButtonLikeShape;
};

export const Copy: FC<Props> = ({ children, value, onCopy, tooltipText, shape = 'outline', ...rest }) => {
    const copyToClipboard = useCopyToClipboard();
    const [boing, setBoing] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>();
    useEffect(() => () => clearTimeout(timer.current), []);

    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        await copyToClipboard(value);
        setBoing(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setBoing(false), 450);
        onCopy?.();
    };

    return (
        <Tooltip title={tooltipText || c('Label').t`Copy`}>
            <Button
                icon
                color="weak"
                shape={shape}
                {...rest}
                className={clsx(rest.className, boing && 'sherma-boing')}
                onClick={handleClick}
            >
                {children || <IcSquares alt={c('Label').t`Copy`} />}
            </Button>
        </Tooltip>
    );
};
