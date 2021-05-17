import React from 'react';
import './MyApp.css';

class Block extends React.Component {
    render() {

        return (
            <div style={{width:'500px',border:'2px solid magenta',margin:'0 auto 10px auto'}}>

                {this.props.item.isSpecial && <div style={{color: 'red'}}>Special</div> }
                {this.props.item.link == null? <div><span className="bold_w">Заголовок:</span> {this.props.item.title}</div> : <div>Заголовок: <a href={this.props.item.link}>{this.props.item.title}</a></div>}
                <div><span className="bold_w">Автор:</span> {this.props.item.author}</div>
                <div className="m_b"><span className="bold_w">Дата:</span> {this.props.item.dateCreated.substr(0,10)}</div>

                <div className="bold_w">Краткое содержание</div>
                <div dangerouslySetInnerHTML={{__html: this.props.item.content}} />




                { this.props.item.categories.length > 0 && <div className="bold_w">Категории</div> }
                {  this.props.item.categories.length > 0 &&  this.props.item.categories.map((category,i) =>
                    <p>{category.name}</p>
                )
                }
                { this.props.item.photo !== null && <img src={this.props.item.photo}/>}
            </div>
        );
    }
}

export default Block;
