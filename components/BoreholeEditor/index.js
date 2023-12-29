import React, { Component } from "react";
import EditorSidebar from "./EditorSidebar/";
import Library from "./Library/";
import { EDITOR_SIDEBAR_WIDTH } from "./../config";
import { BlockTypes } from "./Library/Block/BlockTypes";
import DragAndDrop from "./../../util/drag";
import EditorDetail from "./EditorDetail/";
import EditorView from "./EditorView/";
import { message } from "antd";

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Inner Drag and Drop
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class BoreholeEditor extends Component {
  constructor(props) {
    super(props);
    this.addToStore = this.addToStore.bind(this);
    this.updateItemInStore = this.updateItemInStore.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.sendUpdate = this.sendUpdate.bind(this);

    this.state = {
      id: this.props.id || "",
      last_modified: this.props.last_modified || null,
      sync_status: this.props.sync_status || null,
      dirty: false,
      store: this.props.store || [],
      borehole_title: this.props.borehole_title || "",
      borehole_id: this.props.borehole_id || "",
      selectedIndex: -1,
      selectedSampleIndex: -1,
    };
  }

  sendUpdate = (data) => {
    const last_modified = new Date();
    let req = fetch(
      `${process.env.host}/api/boreholes/${{ ...this.state }.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ ...data, last_modified: last_modified }),
      },
    )
      .then((d) => {})
      .catch((e) => {})
      .finally(() => {
        this.setState({ dirty: false, last_modified: last_modified });
      });
  };

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  };

  updateStore = (id, data) => {
    if (id < 0) {
      return;
    }

    if (
      Object.values(BlockTypes).find((i) => i.type === data.type)
        .multipleAllowed !== true
    ) {
      const _store = [...this.state.store];
      if (_store[id].data.items.length > 0) {
        if (
          _store[id].data.items.find((i) => i.type === data.type) !== undefined
        ) {
          message.warning(
            `${data.type} already exists in this sample - multiple ${data.type} not allowed in one sample`,
            3,
          );
          return;
        }
      }
    }

    this.setState(
      (state) => {
        let store = [...state.store];
        store[id].data.items.push(data);
        const selectedIndex = id;
        const selectedSampleIndex = store[id].data.items.length - 1;
        const dirty = true;
        store[id].data.last_modified = new Date();
        return {
          store,
          selectedIndex,
          selectedSampleIndex,
          dirty,
        };
      },
      this.sendUpdate({
        store: [...this.state.store],
      }),
    );
  };

  addToStore = (id, type, data) => {
    // check if multiple entries are allowed
    // or if currently there are no entries
    const block = Object.values(BlockTypes).find((a) => a.type === type);
    const doesTypeExistInStore = [...this.state.store].find(
      (e) => e.type === type,
    );
    if (block.multipleAllowed === true || doesTypeExistInStore === undefined) {
      const store = [
        ...this.state.store,
        {
          id: id,
          type: type,
          data: data,
        },
      ];
      this.setState(
        (state) => {
          const selectedIndex = store.length - 1;
          const selectedSampleIndex = -1;
          const dirty = true;
          return {
            store,
            selectedIndex,
            selectedSampleIndex,
            dirty,
          };
        },
        this.sendUpdate({
          store: [...store],
        }),
      );
    } else {
      if (block.multipleAllowed === false) {
        message.warning(
          `${block.type} already exists! Multiple ${block.type} not allowed`,
          3,
        );
      }
      this.setState((state) => {
        const selectedIndex = -1;
        const selectedSampleIndex = -1;
        const dirty = false;
        return {
          selectedIndex,
          selectedSampleIndex,
          dirty,
        };
      });
    }
  };

  updateItemInStore = (idx, data, sample_idx = null) => {
    if (idx < 0) {
      return;
    }
    const dirty = true;
    if (sample_idx === null || sample_idx < 0) {
      let store = [...this.state.store];

      store[idx].data = data;
      store[idx].data.last_modified = new Date();

      this.setState(
        (state) => {
          return {
            store,
            dirty,
          };
        },
        this.sendUpdate({
          store: [...store],
        }),
      );
    } else {
      let store = [...this.state.store];
      store[idx].data.items[sample_idx].data = data;
      store[idx].data.last_modified = new Date();
      this.setState(
        (state) => {
          return {
            store,
            dirty,
          };
        },
        this.sendUpdate({
          store: [...store],
        }),
      );
    }
  };

  boreholeIdChange = (id) => {
    this.setState(
      {
        borehole_id: id,
        dirty: true,
      },
      this.sendUpdate({
        borehole_id: id,
      }),
    );
  };

  boreholeTitleChange = (title) => {
    this.setState(
      {
        borehole_title: title,
        dirty: true,
      },
      this.sendUpdate({
        borehole_title: title,
      }),
    );
  };

  removeItem = (idxItem, idxSample) => {
    if (idxItem < 0) {
      return;
    }

    const selectedIndex = -1;
    const selectedSampleIndex = -1;

    let store = [...this.state.store];
    if (idxSample < 0) {
      store.splice(idxItem, 1);
      this.setState(
        {
          ...this.state,
          store: store,
          selectedIndex: selectedIndex,
          selectedSampleIndex: selectedSampleIndex,
        },
        this.sendUpdate({
          store: store,
        }),
      );
    } else {
      store[idxItem].data.items.splice(idxSample, 1);
      this.setState(
        {
          ...this.state,
          store: store,
          selectedIndex: selectedIndex,
          selectedSampleIndex: selectedSampleIndex,
        },
        this.sendUpdate({
          store: store,
        }),
      );
    }
  };

  selectItem = (idxItem, idxSample) => {
    this.setState({
      ...this.state,
      selectedIndex: idxItem,
      selectedSampleIndex: idxSample,
    });
  };

  render() {
    const store = [...this.state.store];
    const selectedIndex = this.state.selectedIndex;
    const selectedSampleIndex = this.state.selectedSampleIndex;
    const borehole_id = this.state.borehole_id;
    const borehole_title = this.state.borehole_title;

    let seletedItem = selectedIndex > -1 ? store[selectedIndex] : null;

    if (selectedSampleIndex > -1) {
      seletedItem = store[selectedIndex].data.items[selectedSampleIndex];
    }

    return (
      <DragAndDrop>
        <div
          className="editor-container flex h-screen font-sans"
          style={{ overflow: "hidden" }}
        >
          <EditorSidebar width={EDITOR_SIDEBAR_WIDTH}>
            <Library></Library>
          </EditorSidebar>
          <EditorView
            dirty={this.state.dirty}
            rawid={this.props.id}
            last_modified={this.state.last_modified}
            borehole_id={borehole_id}
            borehole_title={borehole_title}
            onBoreholeIdChange={this.boreholeIdChange}
            onBoreholeTitleChange={this.boreholeTitleChange}
            onAdd={this.addToStore}
            onUpdate={this.updateStore}
            items={store}
            onItemClick={this.selectItem}
            selectedSampleIndex={selectedSampleIndex}
            selectedIndex={selectedIndex}
          />
          <EditorDetail
            activeContent={seletedItem}
            onRemove={this.removeItem}
            selectedSampleIndex={selectedSampleIndex}
            onUpdate={this.updateItemInStore}
            onExit={this.selectItem}
            idx={selectedIndex}
          ></EditorDetail>
        </div>
      </DragAndDrop>
    );
  }
}

export default BoreholeEditor;
