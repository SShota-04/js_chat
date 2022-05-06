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
const apps = initializeApp(firebaseConfig);

const dbs = getFirestore(apps);

          //送信ボタンクリック時にデータ送信
          $("#send").on("click", function() {
            const postData = {
                comment: $("#comment").val(),
                name: $("#name").val(),
                time: serverTimestamp(),
            };
            addDoc(collection(dbs, "diary"), postData);
            $("#name").val("");
            $("#comment").val("");
        });
    

    //onSnapshotを使うと自動でデータを取得してくれる
    const r = query(collection(dbs, "diary"), orderBy("time", "desc"));

    //データを取得する処理
    onSnapshot(r,(querySnapshots) => {
      console.log(querySnapshots.docs);

      const excels = [];
      querySnapshots.docs.forEach(function(doc){
        const excel = {
          id: doc.id,
          time: convertTimestampToDatetime(doc.data().time?.seconds),
          name: doc.data().name,
          comment: doc.data().comment,
        };
        excels.push(excel);
      });

      console.log(excels);

      document.getElementById("json").innerHTML = JSON.stringify(excels, undefined, 4);
      
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
  
      $("#download_excel").on('click', function(){
          const worksheet = XLSX.utils.json_to_sheet(excels);
          const workbook = {
              Sheets:{
                  'data':worksheet
              },
              SheetNames:['data']
          };
          const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'});
          console.log(excelBuffer);
          saveAsExcel(excelBuffer,'myFile');
      });
      
      function saveAsExcel(buffer,filename){
          const data = new Blob([buffer],{ type: EXCEL_TYPE });
          saveAs(data,filename+'_export_'+new Date().getTime()+EXCEL_EXTENSION);
      };

    });
