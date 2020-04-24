import React from "react";
import './styles.css'

class Reset extends React.Component {
    render() {
        return (
            <div>
                <button className={"reset-moves-button"}
                        onClick={() => this.props.handleClick(this.props.state)}>{this.props.name}</button>
            </div>
        );
    }
}

export default Reset;