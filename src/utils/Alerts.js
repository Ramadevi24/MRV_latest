import PrismCode from "../Components/Prism";

const labelIconAlertsCode = `
<!-- Primary Alert -->
<UncontrolledAlert color="primary" className="bg-primary text-white alert-label-icon" closeClassName="btn-close-white">
    <i className="ri-user-smile-line label-icon"></i><strong>Primary</strong> -Label icon alert
</UncontrolledAlert>

<!-- Secondary Alert -->
<UncontrolledAlert color="secondary" className="bg-secondary text-white alert-label-icon" closeClassName="btn-close-white" >
    <i className="ri-check-double-line label-icon"></i><strong>Secondary</strong>
    - Label icon alert
</UncontrolledAlert>

<!-- Success Alert -->
<UncontrolledAlert color="success" className="bg-success text-white alert-label-icon" closeClassName="btn-close-white">
    <i className="ri-notification-off-line label-icon"></i><strong>Success</strong>
    - Label icon alert
</UncontrolledAlert>

<!-- Danger Alert -->
<UncontrolledAlert color="danger" className="bg-danger text-white alert-label-icon mb-xl-0" closeClassName="btn-close-white">
    <i className="ri-error-warning-line label-icon"></i><strong>Danger</strong>
    - Label icon alert
</UncontrolledAlert>

<!-- Warning Alert -->
<UncontrolledAlert color="warning" className="bg-warning text-white alert-label-icon" closeClassName="btn-close-white">
    <i className="ri-alert-line label-icon"></i><strong>warning</strong> - Label
    icon alert
</UncontrolledAlert>

<!-- Info Alert -->
<UncontrolledAlert color="info" className="bg-info text-white alert-label-icon" closeClassName="btn-close-white">
    <i className="ri-airplay-line label-icon"></i><strong>Info</strong> - Label
    icon alert
</UncontrolledAlert>

<!-- Light Alert -->
<UncontrolledAlert color="light" className="bg-light text-body alert-label-icon" closeClassName="btn-close-white">
    <i className="ri-mail-line label-icon"></i><strong>Light</strong> -
    Label icon alert
</UncontrolledAlert>

<!-- Dark Alert -->
<UncontrolledAlert color="dark" className="bg-dark text-white alert-label-icon mb-0" closeClassName="btn-close-white">
    <i className="ri-refresh-line label-icon"></i><strong>Dark</strong> -
    Label icon alert
</UncontrolledAlert>`;

const LabelIconAlertsExample = () => (
    <PrismCode
        code={labelIconAlertsCode}
        language={("js", "css", "html")}
        plugins={["line-numbers"]}
    />
);

export default LabelIconAlertsExample;