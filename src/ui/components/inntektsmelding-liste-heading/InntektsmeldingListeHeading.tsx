import React from 'react';
import ListItem from '../list-item/ListItem';

const InntektsmeldingListeHeading = (): JSX.Element => (
    <ListItem
        firstColumnRenderer={() => <b>Arbeidsgiver</b>}
        secondColumnRenderer={() => <b>Status inntektsmelding</b>}
    />
);

export default InntektsmeldingListeHeading;
