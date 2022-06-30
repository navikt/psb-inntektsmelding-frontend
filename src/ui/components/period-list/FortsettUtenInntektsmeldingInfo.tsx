import React from 'react';
import { LabelledContent } from '@navikt/ft-plattform-komponenter';
import { Knapp } from 'nav-frontend-knapper';
import Alertstripe from 'nav-frontend-alertstriper';
import { Edit } from '@navikt/ds-icons';
import { Kode, Tilstand } from '../../../types/KompletthetData';
import styles from './periodList.less';
import ContainerContext from '../../../context/ContainerContext';

const FortsettUtenInntektsmeldingInfo = ({
    tilstand,
    redigeringsmodus,
    setRedigeringsmodus,
}: {
    tilstand: Tilstand;
    redigeringsmodus: boolean;
    setRedigeringsmodus: (state: boolean) => void;
}): JSX.Element | null => {
    const { readOnly } = React.useContext(ContainerContext);

    if (tilstand?.vurdering?.kode === Kode.FORTSETT && !redigeringsmodus && tilstand.tilVurdering) {
        return (
            <>
                <Alertstripe type="info" className={styles.periodList__alertstripe}>
                    <span>Fortsett uten inntektsmelding.</span>
                    {!readOnly && (
                        <Knapp mini onClick={() => setRedigeringsmodus(true)}>
                            <Edit />
                            <span>Rediger vurdering</span>
                        </Knapp>
                    )}
                </Alertstripe>
                <LabelledContent label="Begrunnelse" content={<span>{tilstand.begrunnelse}</span>} />
            </>
        );
    }

    return null;
};

export default FortsettUtenInntektsmeldingInfo;
