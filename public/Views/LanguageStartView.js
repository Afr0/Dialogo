import DialogoView from "./DialogoView.js";
import LanguageManager from "../LanguageManager.js";

export default class LanguageStartView extends DialogoView {
    #backBtn;

    #navigateToIndexEvent;
    #navigateToItalianAlphabetGameEvent;
    #navigateToRussianAlphabetGameEvent;
    #navigateToEnglishAlphabetGameEvent;
    #navigateToItalianLanguagePortalEvent;
    #navigateToRussianLanguagePortalEvent;
    #navigateToEnglishLanguagePortalEvent;

    //TODO: Find a way to not hardcode these??
    #italianFlag;
    #russianFlag;
    #UKFlag;

    /**What language did the user choose to learn? */
    learningLanguage = "";

    /**Constructs a new IndexView instance.
     * Please use IndexView.createInstance() to create an instance in a consumer class!
     * @param {string} [viewId=""] The id of the view to create.
     */
    constructor(viewID="") {
        super(viewID);

        this.#italianFlag = document.getElementById("italianFlag");
        LanguageManager.getTranslation("knowthealphabet").then(async (translation) => {
            this.#italianFlag.addEventListener("click", async () => {
                this.learningLanguage = "Italian";
                await this.createConfirmationToast(translation,  
                    async () => await this.#navigateToItalianLanguagePortalEvent(),
                    async () => await this.#navigateToItalianAlphabetGameEvent());
            });
        });

        this.#russianFlag = document.getElementById("russianFlag");
        LanguageManager.getTranslation("knowthealphabet").then(async (translation) => {
            this.#russianFlag.addEventListener("click", async () => {
                this.learningLanguage = "Russian";
                await this.createConfirmationToast(translation,  
                    async () => await this.#navigateToRussianLanguagePortalEvent(),
                    async () => await this.#navigateToRussianAlphabetGameEvent());
            });
        });

        this.#UKFlag = document.getElementById("UKFlag");
        LanguageManager.getTranslation("knowthealphabet").then(async (translation) => {
            this.learningLanguage = "English";
            this.#UKFlag.addEventListener("click", async () => {
                await this.createConfirmationToast(translation,  
                    async () => await this.#navigateToEnglishLanguagePortalEvent(),
                    async () => await this.#navigateToEnglishAlphabetGameEvent());
            });
        });

        let header = document.getElementById("Header");
        LanguageManager.getTranslation("pickalanguage").then((translation) => {
            header.textContent = translation;
        });

        this.#backBtn = document.getElementById("backBtn");
        LanguageManager.getTranslation("back").then((translation) => {
            this.#backBtn.textContent = translation;
        });
        
        this.#backBtn.addEventListener("click", async () => {
            await this.#navigateToIndexEvent();
        });
    }

    onNavigatingToIndex(callback) {
        this.#navigateToIndexEvent = callback;
    }

    onNavigatingToItalianAlphabetGame(callback) {
        this.#navigateToItalianAlphabetGameEvent = callback;
    }

    onNavigatingToRussianAlphabetGame(callback) {
        this.#navigateToRussianAlphabetGameEvent = callback;
    }

    onNavigatingToEnglishAlphabetGame(callback) {
        this.#navigateToEnglishAlphabetGameEvent = callback;
    }

    onNavigatingToItalianLanguagePortal(callback) {
        this.#navigateToItalianLanguagePortalEvent = callback;
    }

    onNavigatingToRussianLanguagePortal(callback) {
        this.#navigateToRussianLanguagePortalEvent = callback;
    }

    onNavigatingToEnglishLanguagePortal(callback) {
        this.#navigateToEnglishLanguagePortalEvent = callback;
    }
 }