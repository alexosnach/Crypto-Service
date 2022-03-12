const EventEmitter = require('events')

class NotificationCenter extends EventEmitter {
    createNotification(notificationName) {
        this.emit(notificationName, 'data')
    }

    addObserver(notificationName) {
        return new Promise((resolve, reject) => {
            this.on(notificationName, data => {
                resolve(data)
            })
        })
    }
}

module.exports = NotificationCenter