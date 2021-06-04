import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        action: [],
        country: [],
        products: [],
        isTouched: false,
        isFormSent: false,
        errors: {
            isErrorImageLink: true,
            isErrorCategory: true,
            isErrorType: true,
            isErrorCountry: true,
            isErrorForm: true,
            imageLink: 'Ссылка не валидна!',
            category: 'Должна быть выбрана хотя бы одна категория!',
            type: 'Должен быть выбран тип!',
            country: 'Должна быть выбрана страна-производитель!'
        },

    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.checkErrorForm();
};

    handleChangeCode = (e) => {
        let val = e.target.value;
        //удаляем любой символ, не являющийся числом
        val = val.replace(/\D/gmi, '');
        //записываем состояние
        this.setState({
            code: val,
            isTouched: true
        });
    };

    handleChangeCategory = (e) => {
        let { target } = e,
        name = target.name,
        val = target.value;
        let current = this.state.category;

        if (current.find((el)=> el == name)){
            current = current.filter((el)=> el != name)
        } else {
            current = [...current,name];
        }
        let isError = current.length > 0 ? false : true;

        this.setState({
            category: current,
            isTouched: true,
            errors: {
                ...this.state.errors,
                isErrorCategory: isError
            }
        });
    }
    handleChangeCountry = (e) => {
        let { target } = e,
            name = target.name,
            val = target.value;
        let current = this.state.country;

        if (!current.find((el)=> el == val)){
            current = [val];
        }
        let isError = current.length > 0 ? false : true;
        this.setState({
            country: current,
            isTouched: true,
            errors: {
                ...this.state.errors,
                isErrorCountry: isError
            }
        });
    }

    handleChangeType = (e) => {
        let { target } = e,
            name = target.id,
            val = target.value;

        this.setState({
            type: name,
            errors: {
                ...this.state.errors,
                isErrorType: false
            },
            isTouched: true
        });
    };

    handleChangeAction = (e) => {
        let { target } = e,
            name = target.name,
            val = target.value;
        let current = this.state.action;
        if (current.find((el)=> el == name)){
            current = [];
        } else {
            current = [name];
        }
        this.setState({
            action: current,
            isTouched: true
        });

    };

    checkErrorForm = (e) => {
        let isErrorForm = this.state.errors.isErrorImageLink || this.state.errors.isErrorCategory || this.state.errors.isErrorType || this.state.errors.isErrorCountry;
        this.setState({
            isFormSent: true,
            errors: {
                ...this.state.errors,
                isErrorForm: isErrorForm
            }
        });

    };


    handleChangeTitle = (e) => {
        let val = e.target.value;
        //обрезаем введенное значение до 5 символов
        if (val.length > 20) {
            val = val.substr(0,20);
        }
        //записываем в состояние
        this.setState({
            isTouched: true,
            title: val,
        });
    };

    handleChangeImageLink = (e) => {
        let val = e.target.value;
        //проверка на валидность ссылки
        let isValid = /^(ftp|http|https):\/\/[^ "]+$/.test(val);
        if (isValid) {
            this.setState({
                imageLink: val,
                errors: {
                    ...this.state.errors,
                    isErrorImageLink: false
                },
                isTouched: true
            });
        } else {
            this.setState({
                imageLink: val,
                errors: {
                    ...this.state.errors,
                    isErrorImageLink: true
                },
                isTouched: true
            });
        }
    }


    handleChangeDescription = (e) => {
        let val = e.target.value;
        //обрезаем введенное значение до 200 символов
        if (val.length > 200) {
            val = val.substr(0,200);
        }
        //записываем в состояние
        this.setState({
            isTouched: true,
            description: val
        });
    };

    render() {

        return (
            <form onSubmit={this.props.onSubmit == "handleSubmit" ? this.handleSubmit: ""} className="filters" style={{width:"450px",margin:"0 auto"}}>
                <div className="filters__cont">
                    {(this.state.errors.isErrorForm && this.state.isFormSent) &&
                        (
                            <div>
                                {this.state.errors.isErrorImageLink && <div style={{color:"red",border:"1px solid red"}}>{this.state.errors.imageLink}</div>}
                                {this.state.errors.isErrorCategory && <div style={{color:"red",border:"1px solid red"}}>{this.state.errors.category}</div>}
                                {this.state.errors.isErrorType && <div style={{color:"red",border:"1px solid red"}}>{this.state.errors.type}</div>}
                                {this.state.errors.isErrorCountry && <div style={{color:"red",border:"1px solid red"}}>{this.state.errors.country}</div>}
                            </div>
                        )
                    }
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Код продукта</span>
                        <input type="text" className="form-control" value={this.state.code} onChange={this.handleChangeCode} placeholder="код продукта" aria-label="Код продукта"
                               aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Заголовок</span>
                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleChangeTitle} placeholder="" aria-label="Заголовок"
                               aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Ссылка на изображение</span>
                        <input type="text" className="form-control"  onChange={this.handleChangeImageLink} placeholder="" aria-label="Ссылка на изображение"
                               aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">Описание</span>
                        <textarea className="form-control" aria-label="Описание" value={this.state.description} onChange={this.handleChangeDescription}></textarea>
                    </div>

                    <div>
                        <p className={"bold_w"}>Категории</p>
                        {
                            categories.map((el,i) => (
                                <div key={i} className="form-check">
                                    <input className="form-check-input" type="checkbox"  name={el} value={ this.state.category.includes(el) ? "checked" : ""} id={el}   onChange = {this.handleChangeCategory} />
                                    <label className="form-check-label" htmlFor={el}> {el} </label>
                                </div>
                            ))
                        }

                    </div>

                    <div>
                        <p className={"bold_w"}>Тип продукта</p>
                        {
                            types.map((el,i) => (
                                <div key={i} className="form-check">
                                    <input className="form-check-input" type="radio" name="type" id={el} value={ this.state.type = el ? "checked" : ""} onChange = {this.handleChangeType}/>
                                    <label className="form-check-label" htmlFor={el}> {el} </label>
                                </div>
                            ))
                        }

                    </div>

                    <div>
                        <p className={"bold_w"}>Участие в акции</p>
                        {
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="action" value={ this.state.action.length > 0 ? "checked" : ""} id="action" onChange={this.handleChangeAction}/>
                                <label className="form-check-label" htmlFor="action"> Акционный продукт </label>
                            </div>
                        }
                    </div>


                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1" className={"bold_w"}>Страна</label>
                        <select multiple className="form-control" id="exampleFormControlSelect1" onChange={this.handleChangeCountry}>
                            <option>---</option>
                            {countries.map(countryLabel => (
                                <option key={countryLabel} value={countryLabel}>{countryLabel}</option>
                            ))}
                        </select>
                    </div>

                    <input className="btn btn-primary" style={{ margin:"10px 0 0 0" }} type="submit"  value="Отправить"/>

                </div>
            </form>
        );
    }
}

export default ProductForm;



ProductForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

ProductForm.defaultProps = {
    handleSubmit: (e) => {
        e.preventDefault();
        console.log('by default')
    }
};
