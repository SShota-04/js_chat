    //ログアウト処理
    import{ auth } from "./firebase.js";

    const logoutButtonRef = document.querySelector("#logout-button");

    auth.onAuthStateChanged(async (user) => {
        console.log(user)
        if(!user){
            location.href = "/login.html";
        }
    });

    logoutButtonRef.addEventListener("click", () => auth.signOut());
