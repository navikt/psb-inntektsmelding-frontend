import React from 'react';
import { LabelledContent } from '@navikt/k9-react-components';
import { Knapp } from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper';
import { Edit } from '@navikt/ds-icons';
import { Kode, Tilstand } from '../../../types/KompletthetData';
import styles from './periodList.less';

const FortsettUtenInntektsmeldingAvslag = ({
    tilstand,
    redigeringsmodus,
    setRedigeringsmodus,
}: {
    tilstand: Tilstand;
    redigeringsmodus: boolean;
    setRedigeringsmodus: (state: boolean) => void;
}): JSX.Element | null => {
    if (tilstand.vurdering.kode !== Kode.MANGLENDE_GRUNNLAG && redigeringsmodus && !tilstand.tilVurdering) {
        return null;
    }
    return (
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
    );
};

export default FortsettUtenInntektsmeldingAvslag;
