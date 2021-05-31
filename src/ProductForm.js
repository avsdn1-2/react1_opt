import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from "./button";

const categories = ['php', 'js', 'python'];
const types = ["application","patch"];

const countries = [
    "Украина",
    "США",
    "Молдова",
    "Германия",
    "Индия"
];

class ProductForm extends Component {
    state = {
        code: '',
        title: '',
        imageLink: '',
        description: '',
        category: [],
        type: '',
        action: false,
        country: null,
        products: [],
        isErrorCategory: true,

    };
    handleSubmit = this.props.handleSubmit;

    handleChangeTextInput = (e) => {
        let { target } = e,
            name = target.name,
            val = target.value;

        this.setState({
            [name]: val,
        });
    };

    handleChangeCategory = (e) => {
        let { target } = e,
        name = target.name,
        val = target.value;
        let current = this.state.category;
        //console.log(current);

        if (current.find((el)=> el == name)){
            this.state.category = current.filter((el)=> el != name)
        } else {
            this.state.category = [...current,name];
        }
        let isError = this.state.category.length > 0 ? false : true;
        //console.log(isError);
        this.setState({
            isErrorCategory: isError,
        });
    }


    handleChangeQuery = (e) => {
        let val = e.target.value;

        console.log(val);
        val = val.replace(val.substr(0,5));

        this.setState({
            query: val,
        });
    };

    handleChangeTextInput = (e) => {
        let { target } = e,
            name = target.name,
            val =  target.value.length <= 5?  target.value : target.value.substr(0,5);
            //console.log(val);
        this.setState({
            [name]: val,
        });
    };

    /*
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
     */

    /*
    Компонент ProductForm должен принимать проп handleSubmit с функцией для обработки отправки формы.
    По умолчанию этот проп должен быть равен console.log.

        код продукта - текст
    заголовок - текст
    описание - textarea
    ссылка на изображение - текст
    выбранные категории - набор чекбоксов
    тип продукта - радио-кнопки
    поле "Акционный продукт" - чекбокс
    страны-производители - селект с мультивыбором

    код продукта - обязательное поле, можно вводить только цифры
    заголовок - обязательное поле, ограничить длину введенного значение до 50 символов
    описание - необязательное поле, ограничить длину введенного значение до 200 символов
    ссылка на изображение - необязательное поле, валидация - формат должен быть как у ссылки
    выбранные категории - обязательное поле, минимум 1 категория должна быть выбрана
    тип продукта - обязательное поле
    страны-производители - обязательное поле

Для валидации добавить показ сообщения об ошибке под каждым полем. Если хотя бы 1 поле не валидное - делать кнопку отправки формы disabled.
     */

/*

 */
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="filters">
                <div className="filters__cont">
                    <button type="button" onClick={this.handleToggle} className="filters__toggler">
                        {this.state.isOpen ? "Close" : "Open"}
                    </button>

                    <div className="filters__content">
                        <div>
                            <label htmlFor="">Код продукта <input type="text" name="code" value={this.state.code} onChange={this.handleChangeTextInput} /></label>
                        </div>
                        <div>
                            <label htmlFor="">Заголовок <input type="text" name="title" value={this.state.title} onChange={this.handleChangeTextInput} /></label>
                        </div>
                        <div>
                            <label htmlFor="">Ссылка на изображение <input type="text" name="imageLink" value={this.state.imagelink} onChange={this.handleChangeTextInput} /></label>
                        </div>
                        <div>
                            <label htmlFor="">Описание <textarea type="text" name="description" value={this.state.description} onChange={this.handleChangeTextInput}></textarea> </label>
                        </div>

                        <div>
                            <p>Категории</p>
                            {
                                categories.map((el) => (
                                    <label htmlFor="">{el}<input onChange = {this.handleChangeCategory} type="checkbox" name={el} /></label>
                                ))
                            }
                            {
                                this.state.isErrorCategory && (<div style={{color:"red"}}>Не выбрана ни одна категория!</div>)
                            }
                            {/* el.categories.length > 0 && <div>Категории</div> */}
                        </div>

                        <div>
                            <p>Тип продукта</p>
                            {
                                types.map((el) => (
                                    <label htmlFor="">{el}<input type="radio" name="{el}" /></label>
                                ))
                            }
                        </div>

                        <div>
                            {
                                <label htmlFor="">Акционный продукт<input type="checkbox" name="action" /></label>
                            }
                        </div>

                        <div>
                            <label htmlFor="">Страна: <select value={this.state.country} onChange={this.handleSelectCountry}>
                                <option>- select -</option>
                                {countries.map(countryLabel => (
                                    <option key={countryLabel} value={countryLabel}>{countryLabel}</option>
                                ))}
                            </select></label>
                        </div>

                        <input type="submit" value="Отправить"/>
                    </div>

                </div>
                <div>


                </div>
            </form>
        );
    }
}

export default ProductForm;



ProductForm.propTypes = {
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imageLink: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.isRequired,
    type: PropTypes.isRequired,
    country: PropTypes.isRequired,
   // as: PropTypes.oneOf(["link", "button", "div"]).isRequired,
};

ProductForm.defaultProps = {
    handleSubmit: (e) => {
        e.preventDefault();
        //this.state.isErrorCategory = this.state.category.length > 0 ? false : true;
        console.log('by default')
    }
};
