import DialogoModel from "../DialogoModel.js";
import CreateUserView from "../Views/CreateUserView.js";
import LanguageManager from "../LanguageManager.js";

/**
 * Controller for the CreateUser view.
 * A controller acts as a bridge between the Model and the View in the MVC pattern.
 * Using a Controller ensures that a Model is never aware of the View and vice
 * versa, ensuring separation of concerns.
 */
class CreateUserController {
    #Model;
    #View;
    #LangManager = new LanguageManager();

    constructor(CreateUserModel, CreateUserView) {
        this.#Model = CreateUserModel;
        this.#View = CreateUserView;

        let userForm = document.getElementById("userForm");

        userForm.addEventListener("submit", async (event) => {
            //Prevents the browsers default behaviour (such as opening a link), 
            //but does not stop the event from bubbling up the DOM:
            //https://jacobwardio.medium.com/how-to-correctly-use-preventdefault-stoppropagation-or-return-false-on-events-6c4e3f31aedb
            event.preventDefault();
            let formData = new FormData(userForm);

            //TODO: Sanity check this - the priority is not great, because the server likely sanity
            //checks whatever it receives.
            this.#Model.postData(CREATEUSER_URL,
                formData, "application/json", "", "", false).then(response => {
                    window.location.href="./index.html?userCreated=true";
                }).catch((error) => {
                    this.#View.createToast(LanguageManager.getTranslation("newuserfailure"));
                    console.log(error);
                });
        });
    }
}

const CREATEUSER_URL = "localhost:8080/user";

//Ensure the Controller is initialized when the webpage has been
//loaded.
document.addEventListener("DOMContentLoaded", function() {
    let appModel = new DialogoModel(DialogoModel.USER_CACHE_NAME);
    let appView = new CreateUserView();
    let appController = new CreateUserController(appModel, appView);
});