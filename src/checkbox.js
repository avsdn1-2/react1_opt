import React, { Component } from 'react';
import PropTypes from 'prop-types';

const buttons = ['red', 'green', 'blue'];

class Checkbox extends Component {
    state = {
        isChecked: false,
        isA: false,
        isB: false,
        checked: [],
    };

    handleClick = () => {

        this.setState((state, props) => {
            return {
                isChecked: !state.isChecked
            };
        });



        this.setState({
            isChecked: false,
        });

        this.setState({
            isA: false,
        });
    };

    handleSelectColor = (color) => {

        let current = this.state.checked;
        //console.log(current);

        if (current.find(el => el === color)) {
            current = current.filter(el => el !== color);
        } else {
            current = [...current, color];
        }
        //console.log(current);

        this.setState({
            checked: current,
        });
    };

    render() {
        return (
            <div>
                {buttons.map(color => (
                    <button style={{backgroundColor: color, color: '#fff'}} onClick={() => this.handleSelectColor(color)}
                    >{color} {
                        this.state.checked.find((el) => el === color) ? "Checked" : "Not checked"
                    }</button>
                ))}
            </div>
        );
    }
}

export default Checkbox;

Checkbox.propTypes = {};

Checkbox.defaultProps = {};
