import React from 'react';
import { Period } from '@navikt/k9-period-utils';
import { CalendarIcon } from '@navikt/k9-react-components';
import { UseFormReturn } from 'react-hook-form';
import styles from './periodList.less';
import FortsettUtenInntektsmeldingForm from '../fortsett-uten-inntektsmelding-form/FortsettUtenInntektsmeldingForm';
import { TilstandBeriket } from '../../../types/KompletthetData';
import FortsettUtenInntektsmeldingInfo from './FortsettUtenInntektsmeldingInfo';
import FortsettUtenInntektsmeldingAvslag from './FortsettUtenInntektsmeldingAvslag';
import Aksjonspunkt from '../../../types/Aksjonspunkt';

interface PeriodListProps {
    tilstander: TilstandBeriket[];
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
    aksjonspunkt: Aksjonspunkt;
    formMethods: UseFormReturn;
    harFlereTilstanderTilVurdering: boolean;
}

const PeriodList = ({
    tilstander,
    listHeadingRenderer,
    listItemRenderer,
    onFormSubmit,
    aksjonspunkt,
    formMethods,
    harFlereTilstanderTilVurdering
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
                <FortsettUtenInntektsmeldingForm
                    onSubmit={onFormSubmit}
                    tilstand={tilstand}
                    aksjonspunkt={aksjonspunkt}
                    formMethods={formMethods}
                    redigeringsmodus={tilstand.redigeringsmodus}
                    setRedigeringsmodus={tilstand.setRedigeringsmodus}
                    harFlereTilstanderTilVurdering={harFlereTilstanderTilVurdering}
                />
                <FortsettUtenInntektsmeldingInfo
                    tilstand={tilstand}
                    redigeringsmodus={tilstand.redigeringsmodus}
                    setRedigeringsmodus={tilstand.setRedigeringsmodus}
                />
                <FortsettUtenInntektsmeldingAvslag
                    tilstand={tilstand}
                    redigeringsmodus={tilstand.redigeringsmodus}
                    setRedigeringsmodus={tilstand.setRedigeringsmodus}
                />
            </li>
        ))}
    </ul>
);

export default PeriodList;
