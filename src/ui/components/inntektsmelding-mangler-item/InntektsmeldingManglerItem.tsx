import { WarningIcon } from '@navikt/ft-plattform-komponenter';
import React from 'react';
import { Status } from '../../../types/KompletthetData';
import ListItem from '../list-item/ListItem';
import styles from '../inntektsmelding-mottatt-item/inntektsmeldingMottattItem.less';
import ArbeidsgiverTekst from '../arbeidsgiver-tekst/ArbeidsgiverTekst';

interface InntektsmeldingMottattItemProps {
    status: Status;
}

interface ManglerContentProps {
    tekst: string;
}

const ManglerContent = ({ tekst }: ManglerContentProps) => (
    <div className={styles.mottattLabel}>
        <WarningIcon />
        <span className={styles.mottattLabel__text}>{tekst}</span>
    </div>
);

const InntektsmeldingManglerItem = ({ status }: InntektsmeldingMottattItemProps): JSX.Element => {
    const tekst = status.status === 'IKKE_PÅKREVD' ? 'Ikke påkrevd' : 'Mangler';
    const firstColumnRenderer = () => <ArbeidsgiverTekst arbeidsgiver={status.arbeidsgiver} />;
    const secondColumnRenderer = () => <ManglerContent tekst={tekst} />;
    return <ListItem firstColumnRenderer={firstColumnRenderer} secondColumnRenderer={secondColumnRenderer} />;
};

export default InntektsmeldingManglerItem;
