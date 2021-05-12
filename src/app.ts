import renderers from './util/renderers';

(window as any).renderKompletthetApp = async (appId, data) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId, data);
};
