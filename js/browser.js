document.addEventListener('DOMContentLoaded', () => {
    const addressForm = document.getElementById('address-form');
    const addressBar = document.getElementById('address-bar');
    const viewport = document.getElementById('web-viewport');
    const reloadBtn = document.getElementById('reload-btn');
    const backBtn = document.getElementById('back-btn');
    const forwardBtn = document.getElementById('forward-btn');

    if (!addressForm || !addressBar || !viewport) return;

    addressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let url = addressBar.value.trim();

        if (url === '') return;

        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        viewport.src = url;
        addressBar.value = url;
    });

    reloadBtn.addEventListener('click', () => {
        viewport.contentWindow.location.reload();
    });

    backBtn.addEventListener('click', () => {
        try {
            viewport.contentWindow.history.back();
        } catch (err) {
            console.warn("The embedded page does not allow back navigation.");
        }
    });

    forwardBtn.addEventListener('click', () => {
        try {
            viewport.contentWindow.history.forward();
        } catch (err) {
            console.warn("The embedded page does not allow forward navigation.");
        }
    });

    viewport.addEventListener('load', () => {
        try {
            addressBar.value = viewport.contentWindow.location.href;
        } catch (err) {
            addressBar.value = viewport.src;
        }
    });
});