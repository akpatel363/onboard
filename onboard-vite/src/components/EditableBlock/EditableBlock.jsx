import { Component } from "react";
import cx from "classnames";
import ContentEditable from "react-contenteditable";
import { textEncoder, textParser } from "../../utils/textParser";

class EditableBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { content: textParser(props.content || "") };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ content: textParser(e.target.value) });
  }

  handleKeyPress(e) {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        return this.props.add();
      case "/":
        if (!this.state.content) {
          this.props.onChangeType(!!this.state.content);
        }
        return;
      case "Backspace":
        if (!this.state.content) {
          e.preventDefault();
          this.props.remove();
        }
        return;
      case "ArrowUp":
        e.preventDefault();
        return this.props.setActiveBlock(-1);
      case "ArrowDown":
        e.preventDefault();
        return this.props.setActiveBlock(1);
      default:
        return;
    }
  }

  render() {
    return (
      <ContentEditable
        className={cx("MuiTypography-root", {
          "MuiTypography-h1": this.props.type === "h1",
          "MuiTypography-h2": this.props.type === "h2",
          "MuiTypography-h3": this.props.type === "h3",
          "MuiTypography-h4": this.props.type === "h4",
          "MuiTypography-body1": this.props.type === "p",
        })}
        id={this.props.id}
        html={this.state.content}
        tagName={this.props.type}
        tabIndex={this.props.index}
        onChange={this.handleChange}
        innerRef={this.props.innerRef}
        onKeyDown={this.handleKeyPress}
        onBlur={() =>
          this.props.onBlur({ content: textEncoder(this.state.content) })
        }
        disabled={this.props.disable}
      />
    );
  }
}

export default EditableBlock;
