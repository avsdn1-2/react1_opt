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
        action: false,
        country: null,
        products: [],
        isStart: true,
        isErrorImageLink: true,
        isErrorType: true,
        isErrorCategory: true,
        isErrorForm: true,

    };
    handleSubmit = this.props.handleSubmit;

    handleChangeCode = (e) => {
        let val = e.target.value;
        //удаляем любой символ, не являющийся числом
        val = val.replace(/\D/gmi, '');
        //записываем состояние
        this.setState({
            code: val,
        });
    };

    handleChangeCategory = (e) => {
        let { target } = e,
        name = target.name,
        val = target.value;
        let current = this.state.category;

        if (current.find((el)=> el == name)){
            this.state.category = current.filter((el)=> el != name)
        } else {
            this.state.category = [...current,name];
        }
        let isError = this.state.category.length > 0 ? false : true;

        this.setState({
            isErrorCategory: isError,
            isErrorForm: this.state.isErrorImageLink || this.state.isErrorType || isError,
            isStart: false
        });

    }

    handleChangeType = (e) => {

        this.setState({
            isErrorType: false,
            isErrorForm: this.state.isErrorImageLink || false || this.state.isErrorCategory,
            isStart: false
        });
    }


    handleChangeTitle = (e) => {
        let val = e.target.value;
        //обрезаем введенное значение до 5 символов
        if (val.length > 20) {
            val = val.substr(0,20);
        }
        //записываем в состояние
        this.setState({
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
                isErrorImageLink: false,
                isErrorForm: false || this.state.isErrorType || this.state.isErrorCategory,
                isStart: false
            });
        } else {
            this.setState({
                isErrorImageLink: true,
                isErrorForm: true,
                isStart: false
            });
        }
        console.log(this.state.isErrorForm);
    }


    handleChangeDescription = (e) => {
        let val = e.target.value;
        //обрезаем введенное значение до 200 символов
        if (val.length > 200) {
            val = val.substr(0,200);
        }
        //записываем в состояние
        this.setState({
            description: val
        });
    };




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

    Для валидации добавить показ сообщения об ошибке под каждым полем. Если хотя бы 1 поле не валидное -
    делать кнопку отправки формы disabled.
     */


    render() {
        return (
            <form onSubmit={this.handleSubmit} className="filters" style={{width:"450px",margin:"0 auto"}}>
                <div className="filters__cont">



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
                    {(this.state.isErrorImageLink && !this.state.isStart) && (<div style={{color:"red",border:"1px solid red"}}>Ссылка невалидна!</div>)}

                    <div className="input-group">
                        <span className="input-group-text">Описание</span>
                        <textarea className="form-control" aria-label="Описание" value={this.state.description} onChange={this.handleChangeDescription}></textarea>
                    </div>

                    <div>
                        <p className={"bold_w"}>Категории</p>
                        {
                            categories.map((el,i) => (
                                <div key={i} className="form-check">
                                    <input className="form-check-input" type="checkbox" name={el} value="" id={el} onChange = {this.handleChangeCategory} />
                                    <label className="form-check-label" htmlFor={el}> {el} </label>
                                </div>
                            ))
                        }
                        {
                            (this.state.isErrorCategory && !this.state.isStart)  && (<div style={{color:"red",border:"1px solid red"}}>Не выбрана ни одна категория!</div>)
                        }
                    </div>

                    <div>
                        <p className={"bold_w"}>Тип продукта</p>
                        {
                            types.map((el,i) => (


                            <div key={i} className="form-check">
                                <input className="form-check-input" type="radio" name="type" id={el} onChange = {this.handleChangeType}/>
                                <label className="form-check-label" htmlFor={el}> {el} </label>
                            </div>
                            ))
                        }
                        {
                            (this.state.isErrorType && !this.state.isStart)  && (<div style={{color:"red",border:"1px solid red"}}>Не выбран ни один тип!</div>)
                        }
                    </div>

                    <div>
                        <p className={"bold_w"}>Участие в акции</p>
                        {
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="action" value="" id="" />
                            <label className="form-check-label" htmlFor="action"> Акционный продукт </label>
                            </div>
                        }
                    </div>


                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1" className={"bold_w"}>Страна</label>
                        <select multiple className="form-control" id="exampleFormControlSelect1">
                            <option>---</option>
                            {countries.map(countryLabel => (
                                <option key={countryLabel} value={countryLabel}>{countryLabel}</option>
                            ))}
                        </select>
                    </div>

                    <input className="btn btn-primary" style={{ margin:"10px 0 0 0" }} type="submit" disabled={this.state.isErrorForm} value="Отправить"/>



                </div>

            </form>
        );
    }
}

export default ProductForm;



ProductForm.propTypes = {

};

ProductForm.defaultProps = {
    handleSubmit: (e) => {
        e.preventDefault();
        console.log('by default')
    }
};
