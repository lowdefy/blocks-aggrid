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

class AgGrid extends React.Component {
  constructor(props) {
    super(props);

    this.onGridReady = this.onGridReady.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.onCellClicked = this.onCellClicked.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
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
        rowIndex: event.rowIndex,
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
          rowIndex: event.rowIndex,
          colId: event.column.colId,
        },
      });
    }
  }

  onRowSelected(event) {
    if (this.props.events.onRowSelected) {
      this.props.methods.triggerEvent({
        name: 'onRowSelected',
        event: { row: event.data, selected: this.gridApi.getSelectedRows() },
        rowIndex: event.rowIndex,
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

  onFilterChanged(event) {
    console.log('Started');
    if (this.props.events.onFilterChanged) {
      this.props.methods.triggerEvent({
        name: 'onFilterChanged',
        event: { rows: event.api.rowModel.rowsToDisplay.map((row) => row.data) },
        // event: { rows: event.api.rowModel.rowsToDisplay },
      });
      console.log(event);
      // console.log(event.api.rowModel.rowsToDisplay.map((row) => row.data));
    }
  }

  render() {
    const { quickFilterValue, ...someProperties } = this.props.properties;
    if (quickFilterValue && quickFilterValue === '') {
      this.gridApi.setQuickFilter(quickFilterValue); // check if empty string matches all
    }
    return (
      <AgGridReact
        onFilterChanged={this.onFilterChanged}
        onSelectionChanged={this.onSelectionChanged}
        onRowSelected={this.onRowSelected}
        onRowClicked={this.onRowClick}
        onCellClicked={this.onCellClicked}
        onGridReady={this.onGridReady}
        modules={AllCommunityModules}
        {...someProperties}
      />
    );
  }
}

export default AgGrid;
