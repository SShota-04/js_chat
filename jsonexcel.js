/*// Import the functions you need from the SDKs you need
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

      //excel出力処理
      const JsonDocument = JSON.stringify(documents);

      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';

      function downloadAsExcel(){
          const worksheet = XLSX.utils.json_to_sheet(JsonDocument);
          const workbook = {
              Sheets:{
                  'data':worksheet
              },
              SheetNames:['data']
          };
          const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'});
          console.log(excelBuffer);
          saveAsExcel(excelBuffer,'myFile');
        };

      function saveAsExcel(buffer,filename){
          const data = new Blob([buffer],{ type: EXCEL_TYPE });
          saveAs(data,filename+'_export_'+new Date().getTime()+EXCEL_EXTENSION);
      };
    });*/

    const data = [{
      "Segment": "Government",
      "Country": "Canada",
      "Product": "Carretera",
      "Discount": "None",
  },
  {
      "Segment": "Government",
      "Country": "Germany",
      "Product": "Carretera",
      "Discount": "None",
  },
  {
      "Segment": "Midmarket",
      "Country": "France",
      "Product": "Carretera",
      "Discount": "None",
  }];
  document.getElementById("json").innerHTML = JSON.stringify(data, undefined, 4);
  
  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const EXCEL_EXTENSION = '.xlsx';
  
  function downloadAsExcel(){
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = {
          Sheets:{
              'data':worksheet
          },
          SheetNames:['data']
      };
      const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'});
      console.log(excelBuffer);
      saveAsExcel(excelBuffer,'myFile');
  };
  
  function saveAsExcel(buffer,filename){
      const data = new Blob([buffer],{ type: EXCEL_TYPE });
      saveAs(data,filename+'_export_'+new Date().getTime()+EXCEL_EXTENSION);
  };
