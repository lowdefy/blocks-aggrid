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

  // see https://stackoverflow.com/questions/55182118/ag-grid-resize-detail-height-when-data-changes
  componentDidUpdate() {
    if (this.gridApi) {
      this.gridApi.resetRowHeights();
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.props.methods.registerMethod('exportDataAsCsv', (args) =>
      this.gridApi.exportDataAsCsv(args)
    );
    this.props.methods.registerMethod('sizeColumnsToFit', () => this.gridApi.sizeColumnsToFit());
    this.props.methods.registerMethod('setFilterModel', (model) =>
      this.gridApi.setFilterModel(model)
    );
    this.props.methods.registerMethod('autoSize', (args = {}) => {
      const { skipHeader, colIds } = args;
      const allColumnIds = colIds || [];
      if (!colIds) {
        this.gridColumnApi.getAllColumns().forEach((column) => {
          allColumnIds.push(column.getId());
        });
      }
      this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
    });
  }

  onRowClick(event) {
    if (this.props.events.onRowClick) {
      this.props.methods.triggerEvent({
        event: { row: event.data, selected: this.gridApi.getSelectedRows() },
        index: parseInt(event.node.id),
        name: 'onRowClick',
        rowIndex: event.rowIndex,
      });
    }
  }

  onCellClicked(event) {
    if (this.props.events.onCellClick) {
      this.props.methods.triggerEvent({
        name: 'onCellClick',
        event: {
          cell: { column: event.colDef.field, value: event.value },
          colId: event.column.colId,
          index: parseInt(event.node.id),
          row: event.data,
          rowIndex: event.rowIndex,
          selected: this.gridApi.getSelectedRows(),
        },
      });
    }
  }

  onRowSelected(event) {
    if (!event.node.selected) return; // see https://stackoverflow.com/a/63265775/2453657
    if (this.props.events.onRowSelected) {
      this.props.methods.triggerEvent({
        event: { row: event.data, selected: this.gridApi.getSelectedRows() },
        index: parseInt(event.node.id),
        name: 'onRowSelected',
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
    if (this.props.events.onFilterChanged) {
      this.props.methods.triggerEvent({
        name: 'onFilterChanged',
        event: { rows: event.api.rowModel.rowsToDisplay.map((row) => row.data) },
      });
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
