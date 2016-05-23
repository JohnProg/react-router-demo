'use strict';

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Product from './Product';

export default class ProductList extends React.Component {

    /**
     * render
     * @returns {XML}
     */
    render() {
        const productsNodes = _.map(this.props.productList, product => (
            <Link
                key={product.id}
                className="list-group-item"
                to={`/product/${product.id}`}>
                {product.title}
            </Link>
        ));
        return (
            <div>
                <h2>welcome</h2>
                <p>Hay {_.size(this.props.productList)}</p>
                <div className="list-group">
                    {productsNodes}
                </div>
            </div>
        );
    }

}

ProductList.propTypes = {
    productList: React.PropTypes.arrayOf(React.PropTypes.object)
};

ProductList.defaultProps = {
    productList: []
};