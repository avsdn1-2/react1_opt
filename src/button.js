import React, { Component }  from 'react';
import PropTypes from 'prop-types';


class Button extends React.Component {
    render() {
        let {
            color,
            as,
            children,
            ...rest
        } = this.props;

        let btnProps = {
            className: `button`,
            style: {
                backgroundColor: color,
            },
            children,
            ...rest,
        };



        if (as === "link") {
            return (
                <a {...btnProps} />
            );
        } else if (as === "div") {
            return (
                <div {...btnProps} />
            );
        } else if (as === "button") {
            return (
                <button {...btnProps} />
            );
        }

        return (
            <span>Error!</span>
        );

    }
}

Button.propTypes = {
    color: PropTypes.oneOf(["green","red","black"]),
    as: PropTypes.oneOf(["link", "button", "div"]).isRequired,
};
Button.defaultProps = {
    color: "black",
    as: "button"
};



export default Button;

