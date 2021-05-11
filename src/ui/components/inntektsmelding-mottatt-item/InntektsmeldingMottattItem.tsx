import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Status } from '../../../types/KompletthetData';
import GreenCheckIconFilled from '../icons/GreenCheckIconFilled';
import ListItem from '../list-item/ListItem';
import styles from './inntektsmeldingMottattItem.less';

interface MottattContentProps {
    dokumentLink: string;
}

const MottattContent = ({ dokumentLink }: MottattContentProps) => (
    <div className={styles.mottattLabel}>
        <GreenCheckIconFilled />
        <div>
            <span className={styles.mottattLabel__text}>Mottatt</span>
            <Lenke className={styles.mottattLabel__link} href={dokumentLink}>
                Vis inntektsmelding
            </Lenke>
        </div>
    </div>
);

interface InntektsmeldingMottattItemProps {
    status: Status;
}

const InntektsmeldingMottattItem = ({ status }: InntektsmeldingMottattItemProps) => {
    return (
        <ListItem
            firstColumnRenderer={() => <span>{status.arbeidsgiver.arbeidsgiver}</span>}
            secondColumnRenderer={() => <MottattContent dokumentLink="#" />}
        />
    );
};

export default InntektsmeldingMottattItem;
