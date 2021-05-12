import React from 'react';
import { Period } from '@navikt/period-utils';
import styles from './periodList.less';
import CalendarIcon from '../icons/CalendarIcon';

interface PeriodListProps {
    periods: Period[];
    listHeadingRenderer: () => React.ReactNode;
    listItemRenderer: (period: Period) => React.ReactNode;
}

const PeriodList = ({ periods, listHeadingRenderer, listItemRenderer }: PeriodListProps) => {
    return (
        <ul className={styles.periodList}>
            {periods.map((period) => {
                return (
                    <li className={styles.periodList__element} key={period.prettifyPeriod()}>
                        <div className={styles.periodList__element__title}>
                            <CalendarIcon />
                            <span className={styles.periodList__element__title__period}>{period.prettifyPeriod()}</span>
                        </div>
                        {listHeadingRenderer()}
                        {listItemRenderer(period)}
                    </li>
                );
            })}
        </ul>
    );
};

export default PeriodList;
