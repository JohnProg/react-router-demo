'use strict';

import React from 'react';
import _ from 'lodash';

import {getProducts} from './WebAPI';

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: []
        };
        this.loadProductsFromServer();
    }

    loadProductsFromServer() {
        getProducts((error, response) => {
            var data = [];
            if (response) {
                data = data.body;
            }
            this.setState({productList: data});
        });
    }

    /**
     * render
     * @returns {XML}
     */
    render() {
        return (
            <section className="main">
                <header><h1>header</h1></header>
                {_.isNull(this.props.children) ? null : React.cloneElement(
                    this.props.children, {productList: this.state.productList}
                )}
            </section>
        );
    }

}

Application.propTypes = {
    children: React.PropTypes.node
};

Application.defaultProps = {
    children: null
};