import React, { useState } from 'react';
import { Period } from '@navikt/k9-period-utils';
import { CalendarIcon, LabelledContent } from '@navikt/k9-react-components';
import { Knapp } from 'nav-frontend-knapper';
import { Edit } from '@navikt/ds-icons';
import Alertstripe from 'nav-frontend-alertstriper';
import styles from './periodList.less';
import FortsettUtenInntektsmeldingForm from '../fortsett-uten-inntektsmelding-form/FortsettUtenInntektsmeldingForm';
import { Tilstand, Kode } from '../../../types/KompletthetData';
import ContainerContext from '../../../context/ContainerContext';
import { finnAktivtAksjonspunkt } from '../../../util/utils';

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
    const { aksjonspunkter, readOnly } = React.useContext(ContainerContext);
    const [redigeringsmodus, setRedigeringsmodus] = useState(false);
    const aktivtAksjonspunkt = finnAktivtAksjonspunkt(aksjonspunkter);
    const forrigeAksjonspunkt = aksjonspunkter.sort((a, b) => Number(b.definisjon.kode) - Number(a.definisjon.kode))[0];
    const aksjonspunkt = aktivtAksjonspunkt || forrigeAksjonspunkt;
    return (
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
                    {((!tilstand.begrunnelse && !readOnly) || redigeringsmodus) &&
                        aksjonspunkt &&
                        tilstand.tilVurdering && (
                            <FortsettUtenInntektsmeldingForm
                                onSubmit={onFormSubmit}
                                tilstand={tilstand}
                                aksjonspunkt={aksjonspunkt}
                                redigeringsmodus={redigeringsmodus}
                                setRedigeringsmodus={setRedigeringsmodus}
                            />
                        )}

                    {tilstand.vurdering.kode === Kode.FORTSETT && !redigeringsmodus && tilstand.tilVurdering && (
                        <>
                            <Alertstripe type="info" className={styles.periodList__alertstripe}>
                                <span>Fortsett uten inntektsmelding.</span>
                                <Knapp mini onClick={() => setRedigeringsmodus(true)}>
                                    <Edit />
                                    <span>Rediger vurdering</span>
                                </Knapp>
                            </Alertstripe>
                            <LabelledContent label="Begrunnelse" content={<span>{tilstand.begrunnelse}</span>} />
                        </>
                    )}
                    {tilstand.vurdering.kode === Kode.MANGLENDE_GRUNNLAG && !redigeringsmodus && tilstand.tilVurdering && (
                        <>
                            <Alertstripe type="feil" className={styles.periodList__alertstripe}>
                                <span>Kan ikke gå videre uten inntektsmelding, søknad avslås.</span>
                                <Knapp mini onClick={() => setRedigeringsmodus(true)}>
                                    <Edit />
                                    <span>Rediger vurdering</span>
                                </Knapp>
                            </Alertstripe>
                            <LabelledContent label="Begrunnelse" content={<span>{tilstand.begrunnelse}</span>} />
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};
export default PeriodList;
