import DialogoModel from "../DialogoModel.js";
import CreateUserView from "../Views/CreateUserView.js";
import LanguageManager from "../LanguageManager.js";
import NavManager from "../NavigationManager.js";
//node-srp was giving me a LOT of grief because of its insistence on require instead of import,
//so ended up using this instead.
import { SrpClient, RFC5054b1024Sha1 } from "@wault-pw/srp6a-webcrypto";


/**
 * Controller for the CreateUser view.
 * A controller acts as a bridge between the Model and the View in the MVC pattern.
 * Using a Controller ensures that a Model is never aware of the View and vice
 * versa, ensuring separation of concerns.
 */
export default class CreateUserController {
    #Model;
    #View;
    #LangManager = new LanguageManager();

    constructor() {
        this.#Model = new DialogoModel(DialogoModel.USER_CACHE_NAME);
        this.#View = new CreateUserView(DialogoModel.CREATEUSERVIEW_ID);

        NavManager.registerView(DialogoModel.CREATEUSERVIEW_ID, this.#View);
        NavManager.showView(DialogoModel.CREATEUSERVIEW_ID);
        console.log(LanguageManager.getTranslation("newuserfailure"));

        let userForm = document.getElementById("userForm");

        userForm.addEventListener("submit", async (event) => {
            //Prevents the browsers default behaviour (such as opening a link), 
            //but does not stop the event from bubbling up the DOM:
            //https://jacobwardio.medium.com/how-to-correctly-use-preventdefault-stoppropagation-or-return-false-on-events-6c4e3f31aedb
            event.preventDefault();

            let userName = document.getElementById("txtUsername").value;
            let password = document.getElementById("txtPassword").value;

            let client = new SrpClient(userName, password, RFC5054b1024Sha1);
            client.seed(await client.randomSalt());
            let verifier = (await client.verifier()).toString('hex');

            //TODO: Sanity check this - the priority is not great, because the server likely sanity
            //checks whatever it receives.
            this.#Model.postData(CREATEUSER_URL,
                { userName: userName, verifier: verifier, salt: client.salt.toString('hex') }, 
                "application/json", "", "", false).then(response => {
                    window.location.href="./index.html?userCreated=true";
                }).catch((error) => {
                    this.#View.createToast(LanguageManager.getTranslation("newuserfailure"));
                    console.log(error);
                });
            });    
    }
}

const CREATEUSER_URL = "http://localhost:8080/user";