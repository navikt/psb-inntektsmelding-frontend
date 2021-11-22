import React from 'react';
import { Status } from '../../../types/KompletthetData';
import InntektsmeldingMottattItem from '../inntektsmelding-mottatt-item/InntektsmeldingMottattItem';
import InntektsmeldingManglerItem from '../inntektsmelding-mangler-item/InntektsmeldingManglerItem';
import styles from './inntektsmeldingListe.less';

interface PeriodListItemProps {
    status: Status[];
}

const renderListItem = (status: Status) => {
    const listItem = (children) => (
        <li className={styles.inntektsmeldingListe__item} key={status.journalpostId}>
            {children}
        </li>
    );
    if (status.status === 'MOTTATT') {
        return listItem(<InntektsmeldingMottattItem status={status} />);
    }
    if (status.status === 'MANGLER') {
        return listItem(<InntektsmeldingManglerItem status={status} />);
    }
    if (status.status === 'FORTSETT_UTEN') {
        return listItem(<InntektsmeldingManglerItem status={status} />);
    }
    return null;
};

const InntektsmeldingListe = ({ status }: PeriodListItemProps): JSX.Element => (
    <ul className={styles.inntektsmeldingListe}>{status.map(renderListItem)}</ul>
);

export default InntektsmeldingListe;
