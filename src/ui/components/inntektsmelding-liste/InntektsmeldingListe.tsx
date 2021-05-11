import React from 'react';
import { Status } from '../../../types/KompletthetData';
import InntektsmeldingMottattItem from '../inntektsmelding-mottatt-item/InntektsmeldingMottattItem';
import InntektsmeldingManglerItem from '../inntektsmelding-mangler-item/InntektsmeldingManglerItem';
import styles from './inntektsmeldingListe.less';

interface PeriodListItemProps {
    status: Status[];
}

const renderListItem = (status: Status) => {
    const listItem = (children) => <li className={styles.inntektsmeldingListe__item}>{children}</li>;
    if (status.status === 'MOTTATT') {
        return listItem(<InntektsmeldingMottattItem status={status} />);
    }
    if (status.status === 'MANGLER') {
        return listItem(<InntektsmeldingManglerItem status={status} />);
    }
    return null;
};

const InntektsmeldingListe = ({ status }: PeriodListItemProps) => {
    return <ul className={styles.inntektsmeldingListe}>{status.map(renderListItem)}</ul>;
};

export default InntektsmeldingListe;
