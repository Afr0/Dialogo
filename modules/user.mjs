import Languages from "../Languages.mjs";
import DBManager from "./storageManager.mjs";

class User {
    #id;
    #userName = "";
    #pwdHash = "";
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

    /**Constructs a new User instance. 
     * @param {string} userName The user's name.
     * @param {string} pwdhash The user's hashed password.
     * @param {number} [preferredLanguage=1] The user's preferred language, defaults to English.
    */
    constructor(userName="", pwdhash="", preferredLanguage = Languages.ImplementedLanguages.English) {
        this.#userName = userName;
        this.#pwdHash = pwdhash;
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