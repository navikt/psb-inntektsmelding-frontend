import React from 'react';
import { Period } from '@navikt/k9-period-utils';
import { CalendarIcon } from '@navikt/k9-react-components';
import styles from './periodList.less';
import FortsettUtenInntektsmeldingForm from '../fortsett-uten-inntektsmelding-form/FortsettUtenInntektsmeldingForm';
import WriteAccessBoundContent from '../write-access-bound-content/WriteAccessBoundContent';

interface PeriodListProps {
    periods: Period[];
    listHeadingRenderer: () => React.ReactNode;
    listItemRenderer: (period: Period) => React.ReactNode;
    onFormSubmit: ({
        begrunnelse,
        periode,
        beslutning,
    }: {
        begrunnelse: string;
        periode: Period;
        beslutning: string;
    }) => void;
}

const PeriodList = ({ periods, listHeadingRenderer, listItemRenderer, onFormSubmit }: PeriodListProps): JSX.Element => (
    <ul className={styles.periodList}>
        {periods.map((period) => (
            <li className={styles.periodList__element} key={period.prettifyPeriod()}>
                <div className={styles.periodList__element__title}>
                    <CalendarIcon />
                    <span className={styles.periodList__element__title__period}>{period.prettifyPeriod()}</span>
                </div>
                {listHeadingRenderer()}
                {listItemRenderer(period)}
                <WriteAccessBoundContent
                    contentRenderer={() => <FortsettUtenInntektsmeldingForm onSubmit={onFormSubmit} periode={period} />}
                />
            </li>
        ))}
    </ul>
);

export default PeriodList;
