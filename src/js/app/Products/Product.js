'use strict';

import React from 'react';
import { IndexLink } from 'react-router';

export default class Product extends React.Component {
    /**
     * render
     * @returns {XML}
     */
    render() {
        const product = _.find(
            this.props.productList,
            u => u.id === parseInt(this.props.params.id)
        );
        return _.isUndefined(product) ? null : (
                <div>
                    <h4 className="list-group-item-heading">{product.title}</h4>
                    <div>{product.video}</div>
                    <p><IndexLink to="/">atras</IndexLink></p>
                </div>
        );
    }

}

Product.propTypes = {
    title: React.PropTypes.string.isRequired,
    video: React.PropTypes.string.isRequired,
    productList: React.PropTypes.arrayOf(React.PropTypes.object)
};

Product.defaultProps = {
    title: '',
    video: '',
    productList: []
};