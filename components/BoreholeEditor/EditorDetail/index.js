import React, { Component } from "react";
import { BlockTypes } from "./../Library/Block/BlockTypes";
import { Button } from "@blueprintjs/core";

const EditorDetailNoSelection = ({ onClick }) => {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className="flex flex-col justify-start p-1 pb-2 border-b-1 hover:border-gray-600 hover:bg-gray-200 text-gray-700 hover:text-gray-900 cursor-not-allowed tooltip"
    >
      <span className="tooltip-text bg-gray-100 border rounded border-gray-400 shadow mt-24 -ml-24 text-xs">
        To open, first select borehole item
      </span>
      <svg className="h-6 w-6 fill-current " viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
          clipRule="evenodd"
        />
      </svg>
      <div
        className="flex mt-1"
        style={{
          transform: "rotate(180deg)",
          writingMode: "vertical-rl",
          textAlign: "center",
          transformOrigin: "center",
        }}
      >
        <h4 className="uppercase text-xs m-0 p-1">Details</h4>
      </div>
    </div>
  );
};

const Guide = () => {
  return <div className="align-middle">Help</div>;
};

const EditorDetailSelection = ({ title, content, onClick, onRemove }) => {
  return (
    <div
      className="flex flex-col"
      style={{ maxWidth: "320px" }}
    >
      <div className="flex flex-row shadow p-1 justify-between mb-2 border-b border-primaryBorderDark align-middle bg-primaryBackgroundSoft text-primaryText">
        <div className="p-1 capitalize flex flex-row align-middle items-center">{`${title} Details`}</div>
        <div className="flex flex-row align-middle items-center">
          {/* <Guide></Guide> */}
          <div
            className="p-1 cursor-pointer hover:bg-gray-400 rounded-lg flex align-middle"
            onClick={onClick}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-stretch h-screen content-between flex-no-wrap">
        <div>{content}</div>
        <div className="flex flex-row justify-end mr-2">
          <Button onClick={onRemove} icon={"trash"}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

class EditorDetail extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      is_open: false,
    };
  }

  handleToggle() {
    this.setState({ is_open: !this.state.is_open });
    this.props.onExit(-1, -1);
  }

  handleRemove() {
    this.props.onRemove(this.props.idx, this.props.selectedSampleIndex);
  }

  render() {
    // only open sidebar if user has selected block
    // or is manually opened by clicking details
    let is_open = this.props.activeContent !== null;
    if (
      is_open === false &&
      this.state.is_open === true &&
      this.props.activeContent === null
    ) {
      is_open = true;
    }

    let content = (
      <EditorDetailNoSelection
        onClick={this.handleToggle}
      ></EditorDetailNoSelection>
    );
    if (is_open === true) {
      if (
        this.props.activeContent !== null &&
        this.props.activeContent !== undefined
      ) {
        const block = Object.values(BlockTypes).find(
          (i) => i.type === this.props.activeContent.type
        );
        content = (
          <EditorDetailSelection
            title={this.props.activeContent.type}
            onClick={this.handleToggle}
            onRemove={this.handleRemove}
            content={block.editor(this.props.activeContent.data, (_data) => {
              this.props.onUpdate(
                this.props.idx,
                _data,
                this.props.selectedSampleIndex
              );
            })}
          ></EditorDetailSelection>
        );
      }
    }
    return (
      <div className="flex flex-col shadow border-l border-primaryBorderDark text-primaryText overflow-auto">
        {content}
      </div>
    );
  }
}

export default EditorDetail;
