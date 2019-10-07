import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDKp0SaoMU0BPJjzb_H9QfrpXMPKy_Ab1A",
  authDomain: "premier-league-b9ec4.firebaseapp.com",
  databaseURL: "https://premier-league-b9ec4.firebaseio.com",
  projectId: "premier-league-b9ec4",
  storageBucket: "premier-league-b9ec4.appspot.com",
  messagingSenderId: "363493706652",
  appId: "1:363493706652:web:866bb6e971bfceb4"
}
class Firebase{

  constructor(){
      firebase.initializeApp(config);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.storage = firebase.storage();
  }
}

export default new Firebase();