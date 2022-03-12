module.exports = {
    getDateFormat(dateTime) {
        let time = new Date(dateTime);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hour = time.getHours();
        let minute = time.getMinutes();

        return `${year}.${month < 10 ? `0${month}` : `${month}`}.${day} at ${hour}:${minute}`;
    },

    putTextIntoVariables(message) {
        const newMessage = message.replaceAll('{price}', 49)
        return newMessage 
    }
}