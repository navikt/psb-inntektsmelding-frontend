import React from 'react';
import { Status } from '../../../types/KompletthetData';
import ListItem from '../list-item/ListItem';
import styles from '../inntektsmelding-mottatt-item/inntektsmeldingMottattItem.less';
import WarningIcon from '../icons/WarningIcon';

interface InntektsmeldingMottattItemProps {
    status: Status;
}

const ManglerContent = () => (
    <div className={styles.mottattLabel}>
        <WarningIcon />
        <span className={styles.mottattLabel__text}>Mangler</span>
    </div>
);

const InntektsmeldingManglerItem = ({ status }: InntektsmeldingMottattItemProps) => {
    return (
        <ListItem
            firstColumnRenderer={() => <span>{status.arbeidsgiver.arbeidsgiver}</span>}
            secondColumnRenderer={() => <ManglerContent />}
        />
    );
};

export default InntektsmeldingManglerItem;
