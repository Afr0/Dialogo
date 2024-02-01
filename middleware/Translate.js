import { promises as fs } from 'node:fs';
import Languages from "Languages.mjs";
import fetch from 'node-fetch';

/**A middleware that translates any number of English sentences into
 * any language(s) that are implemented by an application.
 */
export default class Translate {
    static #apiKey;
    static #url = 'https://translation.googleapis.com/language/translate/v2';
    static #initialized = false;

    /**Initializes this Translate class by loading a Google Translate
     * API key from a specified file.
     * @param {string} [pathToApiKey="API_KEY.txt"] Path to the API key file. Defaults to API_KEY.txt.
     */
    static async initialize(pathToApiKey = "API_KEY.txt") {
        try {
            let data = await fs.readFile(pathToApiKey, "ascii");
            this.#apiKey = data.trim(); //Trim to remove any newline character.
            this.#initialized = true;
        } catch (error) {
            console.error("Failed to initialize Translate class:", error);
            throw error;
        }
    }

    /**Translates a number of sentences from a request
     * into however many languages are implemented in an
     * application.
     */
    static async translateFrom(req, res, next) {
        if (!this.#initialized) {
            console.error("Translate class not initialized.");
            return next(new Error("Translation service not initialized."));
        }
        
        let sentences = req.body.sentences || ["Default"];
        let translatedSentences = [];

        try {
            for(let sentence of sentences) {
                translatedSentences = [];
                //Creates a async function for each object...
                let translationPromises = Object.values(Languages.ImplementedLanguages).map(async (langKey) => {
                    let targetLanguage = Languages.getLanguageName(langKey);

                    //All sentences from the client are assumed to be in English.
                    if(targetLanguage !== "English") {
                        let requestBody = {
                            q: sentence,
                            target: targetLanguage,
                            format: 'text'
                        };

                        let response = await fetch(this.#url + "?key=" + this.#apiKey, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(requestBody),
                        });

                        return response.json();
                    }
                });

                let sentenceTranslations = await Promise.all(translationPromises);
                translatedSentences.push({sentence, translations: sentenceTranslations});
            }
        } catch(error) {
            console.error("Translate: " + error + " error in translation.");
            return next(new Error("Translate: " + error + " error in translation."));
        }

        res.json({translations: translatedSentences});
        next();
    }
}