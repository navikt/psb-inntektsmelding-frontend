import renderers from './util/renderers';

(window as any).renderKompletthetApp = async (appId) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId);
};
