if("serviceWorker" in navigator){
    window.addEventListener("load", function(e){
        navigator.serviceWorker.register("/calculadoraclassica/sw.js", { scope: "/calculadoraclassica" }).
        then((registration) => {
            console.log(registration);
        }, (err) => {
            console.log(err);
        });
    })
}
