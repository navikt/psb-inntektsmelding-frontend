import React, { FC } from 'react';
import cl from 'classnames';
import styles from './alertstripeWithCustomIcon.less';

const AlertstripeWithCustomIcon = ({
    type,
    Icon,
    children,
}: {
    type: string;
    Icon?: FC;
    children: JSX.Element[];
}): JSX.Element => (
    <div
        className={cl({
            alertstripe: true,
            'alertstripe--info': type === 'info',
            'alertstripe--feil': type === 'feil',
        })}
    >
        {children}
    </div>
);

export default AlertstripeWithCustomIcon;
