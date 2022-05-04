const firebaseConfig = {
    
    authDomain: "excel-diary.firebaseapp.com",
    projectId: "excel-diary",
    storageBucket: "excel-diary.appspot.com",
    messagingSenderId: "866106438592",
    appId: "1:866106438592:web:cbad8a3d4d23b7d9bece25"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();

  