import React from 'react';
import axios from 'axios';
import { Period } from '@navikt/period-utils';
import { get } from '../util/httpUtils';
import Kompletthetsoversikt from './components/kompletthetsoversikt/Kompletthetsoversikt';
import mainComponentReducer from './reducer';
import ActionType from './actionTypes';
import PageContainer from './components/page-container/PageContainer';
import { Kompletthet as KompletthetData } from '../types/KompletthetData';
import { Kompletthet as KompletthetResponse } from '../types/KompletthetResponse';
import ContainerContract from '../types/ContainerContract';
import ContainerContext from '../context/ContainerContext';
import tilstandManglerInntektsmelding from '../util/tilstandManglerInntektsmelding';

function initKompletthetsdata({ tilstand }: KompletthetResponse): KompletthetData {
    return {
        tilstand: tilstand.map(({ periode, status }) => {
            const [fom, tom] = periode.split('/');
            return {
                periode: new Period(fom, tom),
                status,
            };
        }),
    };
}

interface MainComponentProps {
    data: ContainerContract;
}

const MainComponent = ({ data }: MainComponentProps) => {
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
                        onFormSubmit={({ begrunnelse }) => {
                            onFinished({
                                begrunnelse,
                                perioder: kompletthetsoversiktResponse.tilstand.map((currentTilstand) => {
                                    if (tilstandManglerInntektsmelding(currentTilstand)) {
                                        return {
                                            periode: currentTilstand.periode,
                                            fortsett: true,
                                        };
                                    }
                                    return {
                                        periode: currentTilstand.periode,
                                        fortsett: false,
                                    };
                                }),
                            });
                        }}
                    />
                )}
            </PageContainer>
        </ContainerContext.Provider>
    );
};

export default MainComponent;
