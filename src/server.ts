import {createApp} from "./bootstrap";
import {DbConnFactory} from "./utils/DbConnFactory";
import {AuthorsController} from "./controllers/AuthorController";
import {BookController} from "./controllers/BookController";

export const app = createApp();

DbConnFactory.initDb()
    .then(() => {
        app.listen(3000);
        console.log('SERVER LISTENING ON PORT 3000');
    })
    .catch(error => {
        console.error(error);
    });
