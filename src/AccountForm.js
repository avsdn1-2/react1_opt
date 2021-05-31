import React, { Component } from 'react';
import PropTypes from 'prop-types';

const gender = ["male", "female", "wtf"];

const interests = [
    "Медведи",
    "Ретро-автомобили",
    "Настолоки"
];
const countries = [
    "Украина",
    "США",
    "Молдова"
];

class AccountForm extends Component {
    state = {
        isOpen: true,
        query: '',
        gender: null,
        interests: [],
        country: null,
        firstName: '',
        lastName: '',
        address: '',
        accounts: [],
    };

    handleToggle = (e) => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    handleChangeQuery = (e) => {
        let val = e.target.value;

        console.log(val);
        val = val.replace(/\D/gmi, '');

        this.setState({
            query: val,
        });
    };

    handleChangeTextInput = (e) => {
        let { target } = e,
            name = target.name,
            val = target.value;

        this.setState({
            [name]: val,
        });
    };

    handleSelectCountry = (e) => {
        let val = e.target.value;
        this.setState({
            country: val,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let account = {
            id: new Date().getTime(),
            name: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.country,
        };

        this.setState({
            accounts: [...this.state.accounts, account],
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="filters">
                <div className="filters__cont">
                    <button type="button" onClick={this.handleToggle} className="filters__toggler">
                        {this.state.isOpen ? "Close" : "Open"}
                    </button>
                    {this.state.isOpen && (
                        <div className="filters__content">
                            <div>
                                <label htmlFor="">First name <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChangeTextInput} /></label>
                            </div>
                            <div>
                                <label htmlFor="">Last name <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChangeTextInput} /></label>
                            </div>
                            <div>
                                <label htmlFor="">Address <input type="text" name="address" value={this.state.address} onChange={this.handleChangeTextInput} /></label>
                            </div>
                            <div>
                                <label htmlFor="">Country: <select value={this.state.country} onChange={this.handleSelectCountry}>
                                    <option>- select -</option>
                                    {countries.map(countryLabel => (
                                        <option key={countryLabel} value={countryLabel}>{countryLabel}</option>
                                    ))}
                                </select></label>
                            </div>
                            <input type="submit" value="Отправить"/>
                        </div>
                    )}
                </div>
                <div>
                    <h2>Accounts:</h2>
                    <div>
                        {this.state.accounts.map(({
                                                      id,
                                                      name,
                                                      lastName,
                                                      country,
                                                  }) => (
                            <div key={id}>
                                <div>Name: {name} {lastName}</div>
                                <div>Country: {country}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        );
    }
}

export default AccountForm;

AccountForm.propTypes = {};

AccountForm.defaultProps = {};
