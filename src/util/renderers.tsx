import React from 'react';
import { createRoot } from 'react-dom/client';
import MainComponent from '../ui/MainComponent';
import ContainerContract from '../types/ContainerContract';

const renderAppInSuccessfulState = (appId: string, data: ContainerContract): void => {
    const container = document.getElementById(appId);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const root = createRoot(container!);
    return root.render(<MainComponent data={data} />);
};
export default {
    renderAppInSuccessfulState,
};
