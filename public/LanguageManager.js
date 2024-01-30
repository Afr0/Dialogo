export class Languages {
    static ImplementedLanguages = {
        Italian: 1,
        English: 2,
        Russian: 3
    }

    /**Returns the string representation of a language based on a given key.
     * @param {number} langValue The key of the language to return the string representation for.
     * @returns The string representation of the language corresponding to the given key. 
     *          Returns null if no key was found.
     */
    static getLanguageName(langValue) {
        for (let key in this.ImplementedLanguages) {
            if (this.ImplementedLanguages[key] === langValue)
                return key;
        }

        return null; // Return null if no matching key is found
    }
}

const CURRENTLANGUAGE_CACHE = "currentLanguage";

/**A very simple manager for locales.
 * Originally written for Helseflora: Applikasjonsutvikling 1.
 * Improved upon for this project by making everything static.
 */
export default class LanguageManager {
    static #currentLanguage;

    /**Sets the language used by the LanguageManager
     * (and by extension, the application).
     * @param {number} lang The language to set. Please
     * pick one from the Languages class.
     * @param {boolean} overrideCache Should the current language
     * be overridden? If this isn't set, the language will only be
     * set if it hasn't already been set (I.E exists in the cache).
     * Defaults to false.
     * @returns True if successful, false otherwise.
     */
    static setLanguage(lang = 1, overrideCache = false) {
        try {
            if((!localStorage.getItem(CURRENTLANGUAGE_CACHE)) || 
              (localStorage.getItem(CURRENTLANGUAGE_CACHE) && overrideCache)) {
                this.#currentLanguage = Languages.getLanguageName(lang);
                this.#loadLanguage(lang);
                localStorage.setItem(CURRENTLANGUAGE_CACHE, lang)
              }
        }
        catch(exception) {
            this.#currentLanguage = "";
            return false;
        }

        return true;
    }

    /**Loads the specified language asynchronously. Needs to be called
     * before getTranslation().
     */
    static async #loadLanguage(lang = 1) {
        if(!this.translations)
            this.translations = {};

        try {
            const response = await fetch(`./Locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error("Could not load language file:", error);
            throw error; //Caught in setLanguage().
        }
    }

    /**Gets a translation for the specified key.
     * @param {string} key The ID of the string (translation) to get.
     * @returns The translation if it was found, otherwise null.
     */
    static getTranslation(key = "") {
        if(!this.#currentLanguage) {
            this.#currentLanguage = localStorage.getItem(CURRENTLANGUAGE_CACHE);

            if(!this.#currentLanguage) {
                console.warn("Tried to use getTranslation() before language was set!");
                return null;
            }
        }

        if (!this.translations[this.#currentLanguage]) {
            console.warn(`Language '${this.#currentLanguage}' not loaded.`);
            return null;
        }

        return this.translations[this.#currentLanguage][key] || `{{${key}}}`;
    }
}