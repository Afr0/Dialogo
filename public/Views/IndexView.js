import DialogoView from "./DialogoView.js";
import LanguageManager from "../LanguageManager.js";

export default class IndexView extends DialogoView {
    #columnClass;
    #languageManager;

    /**Constructs a new instance of IndexView.
     */
    constructor() {
        super();

        this.#languageManager = new LanguageManager();
        
        let btnNewUser = document.getElementById("btnNewUser");
        btnNewUser.addEventListener("click", function() {
            window.location.href = "./createuser.html";
        });
        
        let btnLogin = document.getElementById("btnLogin");
        btnLogin.addEventListener("click", function() {
            window.location.href = "./login.html";
        });
    }
 }