import renderers from './util/renderers';
import ContainerContract from './types/ContainerContract';

interface ExtendedWindow extends Window {
    renderKompletthetApp: (id: string, contract: ContainerContract) => void;
}

(window as Partial<ExtendedWindow>).renderKompletthetApp = async (appId, data) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId, data);
};
