import express, { response } from "express";
import User from "../modules/user.mjs";
import { HttpCodes } from "../modules/httpConstants.mjs";

const USER_API = express.Router();

var users = [];

/**
 * @returns An existing user based on the ID.
 */
USER_API.get('/:id', (req, res) => {
    let { id } = req.params;

    let user = users.find(user => user.getId() === id);

    if (user) {
        res.status(HttpCodes.SuccessfulResponse.Ok).json(user);
    } else {
        res.status(HttpCodes.ClientSideErrorResponse.NotFound).send('User not found!');
    }
});

USER_API.post('/', express.json(), (req, res) => {
    // This is using javascript object destructuring.
    // Recommend reading up https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#syntax
    // https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
    let { userName, password } = req.body;

    if (userName != "" && password != "") {
        const user = new User(userName, password);

        //TODO: Does the user exist?
        let exists = false;

        if (!exists) {
            users.push(user);
            res.status(HttpCodes.SuccessfulResponse.Ok).end();
            console.log("Successfully created user!");
        } else {
            res.status(HttpCodes.ClientSideErrorResponse.BadRequest).end();
        }

    } else {
        res.status(HttpCodes.ClientSideErrorResponse.BadRequest).send("Missing data field.").end();
    }

});

USER_API.put('/:id', (req, res) => {
    /// TODO: Edit user
});

USER_API.delete('/:id', (req, res) => {
    let { id } = req.params;
    let { sessionToken } = req.body; //TODO: Check that this is valid.

    if (sessionToken != "")
        users = users.filter(user => user.getId() !== id);
});

export default USER_API
