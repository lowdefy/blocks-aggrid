/*
  Copyright 2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import React from 'react';

import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';

class AgGridInput extends React.Component {
  constructor(props) {
    super(props);

    this.onGridReady = this.onGridReady.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.onCellClicked = this.onCellClicked.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onRowDragMove = this.onRowDragMove.bind(this);
    this.onCellValueChanged = this.onCellValueChanged.bind(this);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.props.methods.registerMethod('exportDataAsCsv', (args) =>
      this.gridApi.exportDataAsCsv(args)
    );
  }

  onRowClick(event) {
    if (this.props.events.onRowClick) {
      this.props.methods.triggerEvent({
        name: 'onRowClick',
        event: { row: event.data, selected: this.gridApi.getSelectedRows() },
      });
    }
  }

  onCellClicked(event) {
    if (this.props.events.onCellClick) {
      this.props.methods.triggerEvent({
        name: 'onCellClick',
        event: {
          row: event.data,
          cell: { column: event.colDef.field, value: event.value },
          selected: this.gridApi.getSelectedRows(),
        },
      });
    }
  }

  onRowSelected(event) {
    if (this.props.events.onRowSelected) {
      this.props.methods.triggerEvent({
        name: 'onRowSelected',
        event: { row: event.data, selected: this.gridApi.getSelectedRows() },
      });
    }
  }

  onSelectionChanged() {
    if (this.props.events.onSelectionChanged) {
      this.props.methods.triggerEvent({
        name: 'onSelectionChanged',
        event: { selected: this.gridApi.getSelectedRows() },
      });
    }
  }

  onRowDragMove(event) {
    if (event.overNode !== event.node) {
      const fromData = event.node.data;
      const toData = event.overNode.data;
      const fromIndex = this.props.value.indexOf(fromData);
      const toIndex = this.props.value.indexOf(toData);
      const newRowData = this.props.value.slice();
      const element = newRowData[fromIndex];
      newRowData.splice(fromIndex, 1);
      newRowData.splice(toIndex, 0, element);
      this.props.methods.setValue(newRowData);
      this.gridApi.setRowData(this.props.value);
      this.gridApi.clearFocusedCell();
      this.props.methods.triggerEvent({
        name: 'onRowDragMove',
        event: {
          fromData,
          toData,
          fromIndex,
          toIndex,
          newRowData,
        },
      });
    }
  }

  onCellValueChanged(params) {
    const newRowData = this.props.value;
    newRowData[params.rowIndex][params.colDef.field] = params.newValue;
    this.props.methods.setValue(newRowData);
    this.props.methods.triggerEvent({
      name: 'onCellValueChanged',
      event: {
        rowIndex: params.rowIndex,
        rowData: params.data,
        field: params.colDef.field,
        newValue: params.newValue,
        oldValue: params.oldValue,
        newRowData,
      },
    });
  }

  render() {
    const {
      rowSelection = 'single',
      rowMultiSelectWithClick = this.props.properties.rowSelection === 'multiple',
      quickFilterValue,
      ...someProperties
    } = this.props.properties;
    if (quickFilterValue && quickFilterValue === '') {
      this.gridApi.setQuickFilter(quickFilterValue); // check if empty string matches all
    }
    return (
      <AgGridReact
        rowSelection={rowSelection}
        onSelectionChanged={this.onSelectionChanged}
        onRowSelected={this.onRowSelected}
        onRowClicked={this.onRowClick}
        onCellClicked={this.onCellClicked}
        onGridReady={this.onGridReady}
        onRowDragMove={this.onRowDragMove}
        onCellValueChanged={this.onCellValueChanged}
        rowMultiSelectWithClick={rowMultiSelectWithClick}
        modules={AllCommunityModules}
        {...someProperties}
        rowData={this.props.value}
      />
    );
  }
}

export default AgGridInput;
