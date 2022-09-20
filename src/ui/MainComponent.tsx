import { Period } from '@navikt/k9-period-utils';
import { get } from '@navikt/k9-http-utils';
import { PageContainer } from '@navikt/ft-plattform-komponenter';
import '@navikt/ft-plattform-komponenter/dist/style.css';
import axios from 'axios';
import React from 'react';
import '@navikt/ds-css';
import ContainerContext from '../context/ContainerContext';
import ContainerContract from '../types/ContainerContract';
import { Kompletthet as KompletthetData } from '../types/KompletthetData';
import { Kompletthet as KompletthetResponse } from '../types/KompletthetResponse';
import ActionType from './actionTypes';
import Kompletthetsoversikt from './components/kompletthetsoversikt/Kompletthetsoversikt';
import mainComponentReducer from './reducer';

function initKompletthetsdata({ tilstand }: KompletthetResponse): KompletthetData {
    return {
        tilstand: tilstand.map(({ periode, status, begrunnelse, tilVurdering, vurdering }) => {
            const [fom, tom] = periode.split('/');
            return {
                periode: new Period(fom, tom),
                status,
                begrunnelse,
                tilVurdering,
                vurdering,
                periodeOpprinneligFormat: periode,
            };
        }),
    };
}

interface MainComponentProps {
    data: ContainerContract;
}

function MainComponent({ data }: MainComponentProps): JSX.Element {
    const [state, dispatch] = React.useReducer(mainComponentReducer, {
        isLoading: true,
        kompletthetsoversiktHarFeilet: false,
        kompletthetsoversiktResponse: null,
    });

    const httpCanceler = React.useMemo(() => axios.CancelToken.source(), []);
    const { kompletthetsoversiktResponse, isLoading, kompletthetsoversiktHarFeilet } = state;
    const { endpoints, httpErrorHandler, onFinished } = data;

    const getKompletthetsoversikt: () => any = () =>
        axios.get(endpoints.kompletthetBeregning).then((response) => {
            console.log(response);
            return response.data;
        });

    const handleError = (e) => {
        console.log(e);
        dispatch({ type: ActionType.FAILED });
    };

    React.useEffect(() => {
        let isMounted = true;
        console.log('hallo');
        getKompletthetsoversikt()
            .then((response: KompletthetResponse) => {
                console.log(response);
                if (isMounted) {
                    console.log('har mountet', response);
                    dispatch({ type: ActionType.OK, kompletthetsoversiktResponse: response });
                }
            })
            .catch(handleError);
        return () => {
            isMounted = false;
            httpCanceler.cancel();
        };
    }, []);
    return (
        <ContainerContext.Provider value={data}>
            <PageContainer isLoading={isLoading} hasError={kompletthetsoversiktHarFeilet}>
                {kompletthetsoversiktResponse && (
                    <Kompletthetsoversikt
                        kompletthetsoversikt={initKompletthetsdata(kompletthetsoversiktResponse)}
                        onFormSubmit={(payload) => {
                            onFinished(payload);
                        }}
                    />
                )}
            </PageContainer>
        </ContainerContext.Provider>
    );
}

export default MainComponent;
