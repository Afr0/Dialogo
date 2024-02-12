/**Responsible for registering and showing views. */
class NavigationManager {
    constructor() {
        this.views = {};
    }

    /**Registers a view with this NavigationManager instance.
     * @param {string} [viewId=""] The ID of a view as defined in the HTML file.
     * @param {*} viewInstance The instance of the view to be registered.
    */
    registerView(viewId = "", viewInstance) {
        this.views[viewId] = viewInstance;
    }

    /**Shows a view.
     * @param {string} [viewId=""] The ID of a view registered in this NavigationManager.
    */
    showView(viewId = "") {
        Object.values(this.views).forEach(view => view.hide());
        if (this.views[viewId]) {
            this.views[viewId].show();
        } else {
            console.warn(`View ${viewId} not found.`);
        }
    }
}

const NavManager = new NavigationManager();

export default NavManager;