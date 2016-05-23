'use strict';

import request from 'superagent';

/**
 * gets (all) users from the server
 * @param {function} cb
 */
export function getProducts(cb) {
    request.get('http://107.170.69.221/products/api/products/')
        .type('application/json')
        .accept('application/json')
        .end(cb);
}