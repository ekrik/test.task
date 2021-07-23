class Server {
    generateError() {
        return parseInt(Math.floor(Math.random() * 10));
    }

    response(event) {
        const error = this.generateError();

        if (event === 'delete' && error === 5) {
            return 'Не удалось удалить';
        }  

        if (event === 'save' && error === 3) {
            return 'Не удалось сохранить';
        }

        return 200;
    }
}

const server = new Server();

export default server;