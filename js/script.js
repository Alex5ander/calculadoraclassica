if ("serviceWorker" in navigator) {
    window.addEventListener("load", async (e) => {
        const registration = await navigator.serviceWorker.getRegistration();
        if (!registration) {
            await navigator.serviceWorker.register("sw.js");
        }
    })
}