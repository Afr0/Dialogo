import DialogoModel from "../DialogoModel.js";
import TranslateView from "../Views/TranslateView.js";
import LanguageManager from "../LanguageManager.js";

/**
 * Controller for the Translate view.
 * A controller acts as a bridge between the Model and the View in the MVC pattern.
 * Using a Controller ensures that a Model is never aware of the View and vice
 * versa, ensuring separation of concerns.
 */
class TranslateController {
    #Model;
    #View;
    #LangManager = new LanguageManager();

    constructor(TranslateModel, TranslateView) {
        this.#Model = TranslateModel;
        this.#View = TranslateView;

        let btnSubmit = document.getElementById("btnSubmit");
        let txtSentences = document.getElementById("txtSentences");

        btnSubmit.addEventListener("click", async () => {
            let wordsToSend = txtSentences.value.split("\n");
            console.log("Sending sentences for translation...");

            this.#Model.postData(TRANSLATE_URL,
                {sentences : wordsToSend}, "application/json", "", "", false).then(response => {
                    console.log(response);
                }).catch((error) => {
                    this.#View.createToast(LanguageManager.getTranslation("newuserfailure"));
                    console.log(error);
                });
        });
    }
}

const TRANSLATE_URL = "http://localhost:8080/translations";

//Ensure the Controller is initialized when the webpage has been
//loaded.
document.addEventListener("DOMContentLoaded", function() {
    let appModel = new DialogoModel(DialogoModel.USER_CACHE_NAME);
    let appView = new TranslateView();
    let appController = new TranslateController(appModel, appView);
});