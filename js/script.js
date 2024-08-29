if("serviceWorker" in navigator){
    window.addEventListener("load", function(e){
        navigator.serviceWorker.register("sw.js").
        then((registration) => {
            console.log(registration);
        }, (err) => {
            console.log(err);
        });
    })
}
