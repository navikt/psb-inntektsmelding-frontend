import React from 'react';
import { Period } from '@navikt/k9-period-utils';
import { CalendarIcon } from '@navikt/k9-react-components';
import styles from './periodList.less';

interface PeriodListProps {
    periods: Period[];
    listHeadingRenderer: () => React.ReactNode;
    listItemRenderer: (period: Period) => React.ReactNode;
}

const PeriodList = ({ periods, listHeadingRenderer, listItemRenderer }: PeriodListProps): JSX.Element => (
    <ul className={styles.periodList}>
        {periods.map((period) => (
            <li className={styles.periodList__element} key={period.prettifyPeriod()}>
                <div className={styles.periodList__element__title}>
                    <CalendarIcon />
                    <span className={styles.periodList__element__title__period}>{period.prettifyPeriod()}</span>
                </div>
                {listHeadingRenderer()}
                {listItemRenderer(period)}
            </li>
        ))}
    </ul>
);

export default PeriodList;
