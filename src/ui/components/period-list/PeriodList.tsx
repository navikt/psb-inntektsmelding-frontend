import React from 'react';
import { Period } from '@navikt/k9-period-utils';
import { CalendarIcon, LabelledContent } from '@navikt/k9-react-components';
import Alertstripe from 'nav-frontend-alertstriper';
import styles from './periodList.less';
import FortsettUtenInntektsmeldingForm from '../fortsett-uten-inntektsmelding-form/FortsettUtenInntektsmeldingForm';
import WriteAccessBoundContent from '../write-access-bound-content/WriteAccessBoundContent';
import { Tilstand } from '../../../types/KompletthetData';

interface PeriodListProps {
    tilstander: Tilstand[];
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

const PeriodList = ({
    tilstander,
    listHeadingRenderer,
    listItemRenderer,
    onFormSubmit,
}: PeriodListProps): JSX.Element => (
    <ul className={styles.periodList}>
        {tilstander.map((tilstand) => (
            <li className={styles.periodList__element} key={tilstand.periode.prettifyPeriod()}>
                <div className={styles.periodList__element__title}>
                    <CalendarIcon />
                    <span className={styles.periodList__element__title__period}>
                        {tilstand.periode.prettifyPeriod()}
                    </span>
                </div>
                {listHeadingRenderer()}
                {listItemRenderer(tilstand.periode)}
                {!tilstand.begrunnelse && tilstand.tilVurdering && (
                    <WriteAccessBoundContent
                        contentRenderer={() => (
                            <FortsettUtenInntektsmeldingForm onSubmit={onFormSubmit} periode={tilstand.periode} />
                        )}
                    />
                )}
                {tilstand.begrunnelse && tilstand.tilVurdering && (
                    <>
                        <Alertstripe type="info" className={styles.periodList__alertstripe}>
                            Fortsett uten inntektsmelding
                        </Alertstripe>
                        <LabelledContent label="Begrunnelse" content={<span>{tilstand.begrunnelse}</span>} />
                    </>
                )}
            </li>
        ))}
    </ul>
);

export default PeriodList;
