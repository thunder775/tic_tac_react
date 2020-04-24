import React from "react";
import './styles.css';

// class Square extends React.Component {
//
//     render() {
//         return (
//             <button className="square-button" onClick={() => this.props.handleClick()} >{this.props.value}</button>
//         );
//     }
// }

function Square(props) {
    return (
        <button className="square-button" onClick={() => props.handleClick()}>{props.value}</button>
    );

}

export default Square;
