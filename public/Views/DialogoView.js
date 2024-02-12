import LanguageManager from "../LanguageManager.js";

export default class DialogoView {
    events;

    constructor(viewId) {
        this.viewElement = document.getElementById(viewId);
        if (!this.viewElement) throw new Error(`View "${viewId}" not found.`);

        this.events = {};
    }

    /**Registers an event listener.
     * @param {} event The id of the event for which to listen.
     * @param {*} listener The event listener to register.
     */
    on(event = "", listener) {
        if (!this.events[event])
            this.events[event] = [];

        this.events[event].push(listener);
    }

    /**Emits an event.
     * @param {string} [event=""] The id of the event to emit.
     * @param {...*} args The arguments of the event. Optional.
     */
    emit(event = "", ...args) {
        if (this.events[event])
            this.events[event].forEach(listener => listener(...args));
    }

    /**Shows a view. */
    show() {
        this.viewElement.style.display = 'block';
        this.onShow();
    }

    /**Hides a view. */
    hide() {
        this.viewElement.style.display = 'none';
    }

    /**Derived classes should override this to define what is shown. */  
    onShow() {
    }

    /**Create a toast.
     * @param caption The caption of the toast.
     * @param timeout Optional timeout, set to 3500 by default.
     */
    createToast(caption, timeout = 2500) {
        let toast = document.createElement("div");
        toast.classList.add("toast");
        toast.textContent = caption;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, timeout);
    }

    /**Create an interactive toast for confirmation.
    * @param caption The caption of the toast.
    * @param confirmCallback Function to call if user confirms.
    * @param cancelCallback Function to call if user cancels.
    */
    async createConfirmationToast(caption, confirmCallback, cancelCallback) {
        let toast = document.createElement("div");
        toast.classList.add("toast");

        let langManager = new LanguageManager();
    
        let text = document.createElement("span");
        text.textContent = caption;
        toast.appendChild(text);
    
        let btnConfirm = document.createElement("button");
        btnConfirm.classList.add("button");
        btnConfirm.textContent = "Bekreft";
        btnConfirm.onclick = async () => {
            if(confirmCallback)
                await confirmCallback();

            toast.remove();
        };
    
        let btnCancel = document.createElement("button");
        btnCancel.textContent = "Avbryt";
        btnCancel.classList.add("button");
        btnCancel.onclick = async () => {
            if(cancelCallback)
                await cancelCallback();

            toast.remove();
        };

        //Would obviously need more infrastructure for language agnosticity, but the concept works...
        //Could possibly have a global variable somewhere with the selected language...
        langManager.loadLanguage("Norwegian").then(() => {
            btnConfirm.textContent = langManager.getTranslation("Norwegian", "confirm");
            btnCancel.textContent = langManager.getTranslation("Norwegian", "cancel");
        });
    
        toast.appendChild(btnConfirm);
        toast.appendChild(btnCancel);
    
        document.body.appendChild(toast);
    }
 }