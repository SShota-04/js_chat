      
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      import{
        getFirestore,
        collection,
        addDoc,
        serverTimestamp,
        query,
        orderBy,
        onSnapshot,
      } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js"

      // Your web app's Firebase configuration
      const firebaseConfig = {
        
        authDomain: "excel-diary.firebaseapp.com",
        projectId: "excel-diary",
        storageBucket: "excel-diary.appspot.com",
        messagingSenderId: "866106438592",
        appId: "1:866106438592:web:cbad8a3d4d23b7d9bece25"
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      const db = getFirestore(app);

      //送信ボタンクリック時にデータ送信
    $("#send").on("click", function() {
        const postData = {
            comment: $("#comment").val(),
            name: $("#name").val(),
            time: serverTimestamp(),
        };
        addDoc(collection(db, "diary"), postData);
        $("#name").val("");
        $("#comment").val("");
    });

    //onSnapshotを使うと自動でデータを取得してくれる
    const q = query(collection(db, "diary"), orderBy("time", "desc"));

    //データを取得する処理
    onSnapshot(q,(querySnapshot) => {
      console.log(querySnapshot.docs);

      const documents = [];
      querySnapshot.docs.forEach(function(doc){
        const document = {
          id: doc.id,
          data: doc.data(),
        };
        documents.push(document);
      });

      console.log(documents);

      const htmlElements = [];
      documents.forEach(function(document){
        htmlElements.push(`
        <li id="${document.id}">
        <p>${convertTimestampToDatetime(document.data.time?.seconds)}</p>
        <p>${document.data.name}</p>
        <p>${document.data.comment}</p>
      </li>
        `);
      });

      $("#output").html(htmlElements);
    });

    