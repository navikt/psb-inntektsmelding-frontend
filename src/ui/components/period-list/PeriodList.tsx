import React, { useState } from 'react';
import { Period } from '@navikt/k9-period-utils';
import { CalendarIcon } from '@navikt/k9-react-components';
import styles from './periodList.less';
import FortsettUtenInntektsmeldingForm from '../fortsett-uten-inntektsmelding-form/FortsettUtenInntektsmeldingForm';
import { Tilstand } from '../../../types/KompletthetData';
import ContainerContext from '../../../context/ContainerContext';
import { finnAktivtAksjonspunkt } from '../../../util/utils';
import FortsettUtenInntektsmeldingInfo from './FortsettUtenInntektsmeldingInfo';
import FortsettUtenInntektsmeldingAvslag from './FortsettUtenInntektsmeldingAvslag';

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
}: PeriodListProps): JSX.Element => {
    const { aksjonspunkter } = React.useContext(ContainerContext);
    const tilstanderMedRedigering = tilstander.map((tilstand) => {
        const [redigeringsmodus, setRedigeringsmodus] = useState(false);

        return { ...tilstand, redigeringsmodus, setRedigeringsmodus };
    });
    const aktivtAksjonspunkt = finnAktivtAksjonspunkt(aksjonspunkter);
    const forrigeAksjonspunkt = aksjonspunkter.sort((a, b) => Number(b.definisjon.kode) - Number(a.definisjon.kode))[0];
    const aksjonspunkt = aktivtAksjonspunkt || forrigeAksjonspunkt;
    return (
        <ul className={styles.periodList}>
            {tilstanderMedRedigering.map((tilstand) => (
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
                        redigeringsmodus={tilstand.redigeringsmodus}
                        setRedigeringsmodus={tilstand.setRedigeringsmodus}
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
};
export default PeriodList;
