import DialogoModel from "../DialogoModel.js";
import IndexView from "../Views/IndexView.js";
import LanguageManager from "../LanguageManager.js";
import { Languages } from "../LanguageManager.js";

/**
 * Controller for the Index view.
 * A controller acts as a bridge between the Model and the View in the MVC pattern.
 * Using a Controller ensures that a Model is never aware of the View and vice
 * versa, ensuring separation of concerns.
 */
class IndexController {
    #Model;
    #View;

    constructor(mainModel, mainView) {
        this.#Model = mainModel;
        this.#View = mainView;
    }

    /**
     * Initializes this IndexController.
     * @param {*} url The URL to fetch data from.
     */
    async initialize(/*url*/) {
        //Since this is for index.html, let's set and cache the default language
        //and assume the user hasn't changed it. We do not override - the only
        //page that gets to override the currently set language is the
        //language settings page.
        LanguageManager.setLanguage(Languages.ImplementedLanguages.English);

        //TODO
        //let cachedData = await this.#Model.getCache();

        //TODO
        /*if(cachedData) { //getCache potentially returns null SO CHECK THE ¤%/& RESULT!
            this.#View.populatePlantCategories(cachedData);
        } else {
            this.#Model.fetchData(url).then(data => {
                this.#View.populatePlantCategories(data);
            }).catch(error => {
                //TODO: Display error to user with a messagebox...
                console.error(error); 
            });
        }*/
    }
}

const KEY = "CKXDXF73";
const MAIN_URL = "https://helseflora.herokuapp.com/webshop/categories?key=" + KEY;

//Ensure the Controller is initialized when the webpage has been
//loaded.
document.addEventListener("DOMContentLoaded", async function() {
    let urlParams = new URLSearchParams(window.location.search);

    let appModel = new DialogoModel(DialogoModel.MAIN_CACHE_NAME);
    let appView = new IndexView();

    if(urlParams.get("userCreated") === "true")
        appView.createToast(LanguageManager.getTranslation("newusercreated"));
    if(urlParams.get("userDeleted") === "true")
        appView.createToast(LanguageManager.getTranslation("userdeleted"));
    if(urlParams.get("loggedOut") === "true")
        appView.createToast(LanguageManager.getTranslation("userloggedout"));

    let appController = new IndexController(appModel, appView);
    await appController.initialize(/*MAIN_URL*/);
});