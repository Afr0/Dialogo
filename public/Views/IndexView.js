import DialogoView from "./DialogoView.js";
import LanguageManager from "../LanguageManager.js";

export default class IndexView extends DialogoView {
    #columnClass;
    #languageManager;

    /**Constructs a new instance of IndexView.
     */
    constructor(viewID) {
        super(viewID);

        this.#languageManager = new LanguageManager();
        
        let btnNewUser = document.getElementById("btnNewUser");
        btnNewUser.addEventListener("click", () => {
            this.emit("navigateToCreateUser");
        });
        
        let btnLogin = document.getElementById("btnLogin");
        btnLogin.addEventListener("click", () => {
            window.location.href = "./login.html";
        });
    }

    onShow() {
        //TODO: Dynamically create content...
    }
 }