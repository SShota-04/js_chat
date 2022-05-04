import { auth } from "./firebase.js";

let ui = new firebaseui.auth.AuthUI(auth);
let uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            console.log(authResult, redirectUrl);
            return true;
        },
        uiShown: function() {
            document.getElementById("loader").style.display = "none";
        },
    },
    signInFlow: "popup",
    signInSuccessUrl: "/index.html",
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "<your-tos-url>",
    privacyPolicyUrl: "<your-privacy-policy-url>",
};

ui.start("#firebaseui-auth-container", uiConfig);

auth.onAuthStateChanged(async (user) => {
    if(!user && location.pathname !== "/login.html"){
        location.href = "/login.html";
    };
});