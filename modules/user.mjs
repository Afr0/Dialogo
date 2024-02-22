import Languages from "../Languages.mjs";
import DBManager from "./storageManager.mjs";

class User {
    #id;
    #userName = "";
    #pwdHash = "";
    #salt = "";
    #preferredLanguage;

    /**
    * Gets this user's id.
    * @returns The user's id.
    */
    getId() {
        return this.#id;
    }

    /**
     * Gets this user's username.
     * @returns The user's username.
     */
    getUsername() {
        return this.#userName;
    }

    /**
     * Gets this user's verifier.
     * @returns The user's verifier.
     */
    getVerifier() {
      return this.#pwdHash;
    }

    /**
     * Gets this user's salt.
     * @returns The user's salt.
     */
    getSalt() {
      return this.#salt;
    }

    /**
     * Gets this user's preferred language.
     * @returns The user's preferred language.
     */
    getPreferredLanguage() {
      return this.#preferredLanguage;
    }

    /**Constructs a new User instance. 
     * @param {string} userName The user's name.
     * @param {string} verifier The user's verifier.
     * @param {string} salt The user's salt.
     * @param {number} [preferredLanguage=1] The user's preferred language, defaults to English.
    */
    constructor(userName="", verifier="", salt="", preferredLanguage = Languages.ImplementedLanguages.English) {
        this.#userName = userName;
        this.#pwdHash = verifier;
        this.#salt = salt;
        this.#preferredLanguage = preferredLanguage;
    }

    async save() {

        //TODO: What happens if the DBManager fails to complete its task?
    
        //We know that if a user object dos not have the ID, then it cant be in the DB.
        if (this.id == null) 
          return await DBManager.createUser(this);
        else
          return await DBManager.updateUser(this);
      }
    
      delete() {
        //TODO: What happens if the DBManager fails to complete its task?
        DBManager.deleteUser(this);
      }
}

export default User;