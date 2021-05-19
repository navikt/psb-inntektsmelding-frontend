import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Status } from '../../../types/KompletthetData';
import GreenCheckIconFilled from '../icons/GreenCheckIconFilled';
import ListItem from '../list-item/ListItem';
import styles from './inntektsmeldingMottattItem.less';
import ArbeidsgiverTekst from '../arbeidsgiver-tekst/ArbeidsgiverTekst';
import ContainerContext from '../../../context/ContainerContext';
import { DokumentOpplysninger } from '../../../types/ContainerContract';

interface MottattContentProps {
    dokumentLink: string;
}

const MottattContent = ({ dokumentLink }: MottattContentProps) => (
    <div className={styles.mottattLabel}>
        <GreenCheckIconFilled />
        <div>
            <span className={styles.mottattLabel__text}>Mottatt</span>
            <Lenke className={styles.mottattLabel__link} href={dokumentLink} target="_blank">
                Vis inntektsmelding
            </Lenke>
        </div>
    </div>
);

interface InntektsmeldingMottattItemProps {
    status: Status;
}

const finnDokumentLink = (dokumenter: DokumentOpplysninger[], journalpostId: string) =>
    dokumenter.find((dokument) => dokument.journalpostId === journalpostId);

const InntektsmeldingMottattItem = ({ status }: InntektsmeldingMottattItemProps) => {
    const { dokumenter } = React.useContext(ContainerContext);
    const dokumentLink = finnDokumentLink(dokumenter || [], status.journalpostId)?.href;
    return (
        <ListItem
            firstColumnRenderer={() => <ArbeidsgiverTekst arbeidsgiver={status.arbeidsgiver} />}
            secondColumnRenderer={() => <MottattContent dokumentLink={dokumentLink || '#'} />}
        />
    );
};

export default InntektsmeldingMottattItem;
