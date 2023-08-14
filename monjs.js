import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDsnWdo8KR2VC00MZbiII9xxlmjyb1Escw",
    authDomain: "martinienshoppingapp.firebaseapp.com",
    databaseURL: "https://martinienshoppingapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "martinienshoppingapp",
    storageBucket: "martinienshoppingapp.appspot.com",
    messagingSenderId: "815682638175",
    appId: "1:815682638175:web:a394df501a6f733aa7e6ea",
    measurementId: "G-G6NCJBXDVX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const ShoppingListInDB = ref(database, 'shopping list')


const inputFieldEl = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-button")
const shopList = document.getElementById("shopping-list")

addButtonEL.addEventListener("click", function () {
    let inputvalue = inputFieldEl.value;
    if (inputvalue.length > 0) {
        inputToEmpty();
        push(ShoppingListInDB, inputvalue);
    }
})
onValue(ShoppingListInDB, function (snapshop) {
    if (snapshop.exists()) {
        let liste = Object.entries(snapshop.val())
        shopList.innerHTML = "";
        for (let i = 0; i < liste.length; i++) {
            let current_item = liste[i]
            addToShop(current_item);
        }
    }
    else {
        shopList.innerHTML = "Aucun élement...!"
    }
})

function inputToEmpty() {
    inputFieldEl.value = "";
}
function addToShop(item) {
    let newEl = document.createElement("li")
    newEl.setAttribute('title', 'Cliquer pour supprimer')
    let itemId = item[0]
    let itemValue = item[1]

    newEl.textContent = itemValue
    shopList.appendChild(newEl)
    newEl.addEventListener("click", function () {
        let exactLocationId = ref(database, `shopping list/${itemId}`)
        remove(exactLocationId)
    })
}