import { Period } from '@navikt/k9-period-utils';
import { get } from '@navikt/k9-http-utils';
import { PageContainer } from '@navikt/k9-react-components';
import axios from 'axios';
import React from 'react';
import ContainerContext from '../context/ContainerContext';
import ContainerContract from '../types/ContainerContract';
import { Kompletthet as KompletthetData } from '../types/KompletthetData';
import { Kompletthet as KompletthetResponse } from '../types/KompletthetResponse';
import ActionType from './actionTypes';
import Kompletthetsoversikt from './components/kompletthetsoversikt/Kompletthetsoversikt';
import mainComponentReducer from './reducer';

function initKompletthetsdata({ tilstand }: KompletthetResponse): KompletthetData {
    return {
        tilstand: tilstand.map(({ periode, status, begrunnelse, tilVurdering }) => {
            const [fom, tom] = periode.split('/');
            return {
                periode: new Period(fom, tom),
                status,
                begrunnelse,
                tilVurdering
            };
        }),
    };
}

interface MainComponentProps {
    data: ContainerContract;
}

const MainComponent = ({ data }: MainComponentProps): JSX.Element => {
    const [state, dispatch] = React.useReducer(mainComponentReducer, {
        isLoading: true,
        kompletthetsoversiktHarFeilet: false,
        kompletthetsoversiktResponse: null,
    });

    const httpCanceler = React.useMemo(() => axios.CancelToken.source(), []);
    const { kompletthetsoversiktResponse, isLoading, kompletthetsoversiktHarFeilet } = state;
    const { endpoints, httpErrorHandler, onFinished } = data;

    const getKompletthetsoversikt = () =>
        get<KompletthetResponse>(endpoints.kompletthetBeregning, httpErrorHandler, {
            cancelToken: httpCanceler.token,
        });

    const handleError = () => {
        dispatch({ type: ActionType.FAILED });
    };

    React.useEffect(() => {
        let isMounted = true;
        getKompletthetsoversikt()
            .then((response: KompletthetResponse) => {
                if (isMounted) {
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
                        onFormSubmit={({ begrunnelse, periode, beslutning }) => {
                            onFinished({
                                begrunnelse,
                                perioder: [
                                    {
                                        periode: `${periode.fom}/${periode.tom}`,
                                        fortsett: beslutning === 'fortsett',
                                        begrunnelse
                                    },
                                ],
                            });
                        }}
                    />
                )}
            </PageContainer>
        </ContainerContext.Provider>
    );
};

export default MainComponent;
