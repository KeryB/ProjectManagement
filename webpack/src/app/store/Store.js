"use strict";

if (process.env.NODE_ENV === 'development') {
    module.exports = require('./Store.dev')
} else {
    module.exports = require('./Store.prod')
}