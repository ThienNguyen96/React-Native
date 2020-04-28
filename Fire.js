import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCAKCC5GsCInd0JOeeUPN_cGpXQowBvjz4",
    authDomain: "rn-todolist-df75e.firebaseapp.com",
    databaseURL: "https://rn-todolist-df75e.firebaseio.com",
    projectId: "rn-todolist-df75e",
    storageBucket: "rn-todolist-df75e.appspot.com",
    messagingSenderId: "393587164300",
    appId: "1:393587164300:web:7cdf3551f64af173bda7a9"
};

class Fire{
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase.auth().signInAnonymously().catch(err => {
                    callback(error);
                })
            }
        });
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");

        this.unsubcribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }

    get ref() {
        return firebase
        .firestore()
        .collection("user")
        .doc(this.userID)
        .collection("lists");
    }

    get userID() {
        return firebase.auth().currentUser.uid;
    }

    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    detach() {
        this.unsubcribe();
    }
};

export default Fire;