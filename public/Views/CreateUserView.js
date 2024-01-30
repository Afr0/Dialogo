import View from "./View.js";

export default class CreateUserView extends View {
    #backBtn;

    constructor() {
        super();

        this.#backBtn = document.getElementsByClassName("backButton")[0];
        this.#backBtn.addEventListener("click", function() {
            window.location.href = "./index.html"; //./ redirects browser to webpage in the same folder.
        });
    }
 }