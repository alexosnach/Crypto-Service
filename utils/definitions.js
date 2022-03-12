module.exports = {
    MESSAGE_TYPE: {
        WELCOME: 'welcome',
        START_SUBSCRIPTION: 'start-subscription',
        END_SUBSCRIPTION: 'end-subscription',
        CURRENT_SUBSCRIPTION_STATUS: 'current-subscription-status',
        NO_SUBSCRIPTION: 'no-subscription'
    },
    SIGNAL_AUDIENCE_TYPE: {
        ALL_USERS: 'all-users',
        SUBSCRIBERS: 'subscribers',
        FREE_USERS: 'free-users'
    },
    CUSTOMER: {
        STATUS: {
            ACTIVE: 'active',
            STOPPED: 'stopped'
        }
    },
    SIGNAL: {
        STATUS: {
            WAIT: 'wait',
            PROGRESS: 'progress',
            CLOSED: 'closed'
        }
    },
    EVENTS: {
        UPDATE_SETTINGS: 'update-settings'
    }
}