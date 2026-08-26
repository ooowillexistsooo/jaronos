document.addEventListener('DOMContentLoaded', () => {
    const addressForm = document.getElementById('address-form');
    const addressBar = document.getElementById('address-bar');
    const viewport = document.getElementById('web-viewport');
    const reloadBtn = document.getElementById('reload-btn');
    const backBtn = document.getElementById('back-btn');
    const forwardBtn = document.getElementById('forward-btn');

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
        viewport.src = viewport.src;
    });

    backBtn.addEventListener('click', () => {
        try {
            window.history.back();
        } catch (err) {
            console.warn("history restricted its not my fault i swear")
        }
    });

    forwardBtn.addEventListener('click', () => {
        console.warn("going forward is also blocked im sorry :(")
    });
});