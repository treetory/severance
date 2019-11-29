
const renewTokenIntoURL = (function(){

    let main = function(renewedToken) {
        let oldToken = localStorage.getItem("token").split(" ")[1];
        //console.log(oldToken);
        //console.log(renewedToken);
        if (renewedToken != oldToken) {
            localStorage.removeItem("token");
            localStorage.setItem("token", "Bearer "+renewedToken);
            location.search = "?token="+renewedToken;
        }
    };
    return main;

})();

export { renewTokenIntoURL }