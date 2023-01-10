import axios from 'axios';

const ENDPOINT_URL = 'http://localhost:3003/todo'

const todoApi = {
    // ********** NOTES **********//
    // ● await and async are added when we used to wait until http request is back.
    // ● You can also use .then method.
    // ********** //
    // ● .data is a property of the response produced by axios library. (You get an object)
    // ********** //
    // ● Post mehtod's secound argument is to be sent to json as an request to the server
    // ********** //
    // ● For both delete and patch method you nedd the link path to delete them
    // ********** NOTES **********//
    async getAll() {
        const result = await axios.get(ENDPOINT_URL);
        return result.data;
    },
    async post(todo) {
        const result = await axios.post(ENDPOINT_URL, todo);
        return result.data;
    },
    async delete(todo) {
        const result = await axios.delete(ENDPOINT_URL + '/' + todo.id);
        return result.data;
    },
    async patch(todo) {
        const result = await axios.put(ENDPOINT_URL + '/' + todo.id, todo);
        return result.data;
    }
}

export default todoApi;
