# Lowdefy Blocks for Ag-Grid

This repository provides blocks for [Ag-Grid](https://www.ag-grid.com/), a feature rich javascript grid amd table library.

The implementation of these blocks is a minimal wrapper for the [@ag-grid-community/core
](https://www.npmjs.com/package/@ag-grid-community/core) package. This means you write normal Ag-Grid config to create tables.

See the [Ag-Grid docs](https://www.ag-grid.com/documentation/react/getting-started/) for the table settings API.

## Blocks

Block types for supported [Ag-Grid themes](https://www.ag-grid.com/documentation/javascript/themes-provided/) are available.

### Block type Urls

The block types are hosted at:

- `AgGridAlpine`: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridAlpine.json
- `AgGridAlpineDark`: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridAlpineDark.json
- `AgGridBalham`: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridBalham.json
- `AgGridBalhamDark`: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridBalhamDark.json
- `AgGridMaterial`: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridMaterial.json

### Events

- `onRowClick`: Trigger event when a row is clicked and pass `row: object` and `selected: object[]` row data to action `_event`.
- `onCellClick`:Trigger event when a cell is clicked and pass `row: object`, `cell: object` and `selected: object[]` row data to action `_event`.

### AgGridAlpine Example

```yaml
name: my-app
lowdefy: 3.10.1
types:
  AgGridAlpine:
    url: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridAlpine.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_table
        type: AgGridAlpine
        properties:
          rowData:
            - title: One
              year: 2010
              viewerReviews: 30
            - title: Two
              year: 2011
              viewerReviews: 20
          defaultColDef:
            sortable: true
            resizable: true
            filter: true
          columnDefs:
            - headerName: Title
              field: title
              width: 350
            - headerName: Year
              field: year
              width: 100
            - headerName: Viewer Reviews
              field: viewerReviews
              width: 160
              type: numericColumn
```

### AgGridAlpine valueFormatter: \_function Example

```yaml
name: my-app
lowdefy: 3.10.1
types:
  AgGridAlpine:
    url: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridAlpine.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_table
        type: AgGridAlpine
        properties:
          rowData:
            - title: One
              year: 2010
              total: 300.21
            - title: Two
              year: 2011
              total: 1230.9495
          defaultColDef:
            sortable: true
            resizable: true
            filter: true
          columnDefs:
            - headerName: Title
              field: title
              width: 350
            - headerName: Year
              field: year
              width: 100
            - headerName: Total
              field: total
              width: 160
              type: numericColumn
              valueFormatter:
                _function:
                  __format.intlNumberFormat:
                    on:
                      __args: 0.value
                    params:
                      options:
                        style: 'currency'
                        currency: 'EUR'
```

### AgGridAlpine onRowClick Example

```yaml
name: my-app
lowdefy: 3.10.1
types:
  AgGridAlpine:
    url: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridAlpine.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_table
        type: AgGridAlpine
        properties:
          rowData:
            - title: One
              year: 2010
              viewerReviews: 30
            - title: Two
              year: 2011
              viewerReviews: 20
          defaultColDef:
            sortable: true
            resizable: true
            filter: true
          columnDefs:
            - headerName: Title
              field: title
              width: 350
            - headerName: Year
              field: year
              width: 100
            - headerName: Viewer Reviews
              field: viewerReviews
              width: 160
              type: numericColumn
        events:
          onRowClick:
            - id: set_selected
              type: SetState
              params:
                selected_row: # Update 'selected' in state with the event data.
                  _event: row
      - id: selection
        type: Title
        properties:
          level: 4
          content:
            _if: # Show the event data in a title, or call to action.
              test:
                _eq:
                  - _state: selected_row
                  - null
              then: 'Click to select a row.'
              else:
                _string.concat:
                  - 'Title: '
                  - _state: selected_row.title
                  - ', Year: '
                  - _state: selected_row.year
```

### AgGridAlpine onCellClick Example

```yaml
name: my-app
lowdefy: 3.10.1
types:
  AgGridAlpine:
    url: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridAlpine.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_table
        type: AgGridAlpine
        properties:
          rowData:
            - title: One
              year: 2010
              viewerReviews: 30
            - title: Two
              year: 2011
              viewerReviews: 20
          defaultColDef:
            sortable: true
            resizable: true
            filter: true
          columnDefs:
            - headerName: Title
              field: title
              width: 350
            - headerName: Year
              field: year
              width: 100
            - headerName: Viewer Reviews
              field: viewerReviews
              width: 160
              type: numericColumn
        events:
          onCellClick:
            - id: set_selected
              type: SetState
              params:
                selected_cell: # Update 'selected_cell' in state with the event cell data.
                  _event: cell
      - id: selection
        type: Title
        properties:
          level: 4
          content:
            _if: # Show the event data in a title, or call to action.
              test:
                _eq:
                  - _state: selected_cell.column
                  - title
              then:
                _string.concat:
                  - 'Title: '
                  - _state: selected_cell.value
              else: 'Select a movie title.'
```

### AgGridAlpine onRowSelected Example

```yaml
name: my-app
lowdefy: 3.10.1
types:
  AgGridAlpine:
    url: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridAlpine.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_table
        type: AgGridAlpine
        properties:
          rowData:
            - title: One
              year: 2010
              viewerReviews: 30
            - title: Two
              year: 2011
              viewerReviews: 20
          defaultColDef:
            sortable: true
            resizable: true
            filter: true
          rowSelection: 'multiple'
          columnDefs:
            - headerName: Title
              field: title
              width: 350
              checkboxSelection: true
            - headerName: Year
              field: year
              width: 100
            - headerName: Viewer Reviews
              field: viewerReviews
              width: 160
              type: numericColumn
        events:
          onRowSelected:
            - id: set_selected
              type: SetState
              params:
                selected_row: # Update 'selected' in state with the event data.
                  _event: row
                all_selected:
                  _event: selected
      - id: selection
        type: Title
        properties:
          level: 4
          content:
            _if: # Show the event data in a title, or call to action.
              test:
                _eq:
                  - _state: selected_row
                  - null
              then: 'Click to select a row.'
              else:
                _string.concat:
                  - 'Last Selected - Title: '
                  - _state: selected_row.title
                  - ', Year: '
                  - _state: selected_row.year
      - id: all_selected
        type: Title
        properties:
          level: 4
          content:
            _if: # Show the event data in a title, or call to action.
              test:
                _eq:
                  - _state: all_selected
                  - null
              then: 'Select rows.'
              else:
                _string.concat:
                  - 'Total Selected: '
                  - _array.length:
                      _state: all_selected
```

### AgGridAlpine onSelectionChanged Example

```yaml
name: my-app
lowdefy: 3.10.1
types:
  AgGridAlpine:
    url: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGridAlpine.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_table
        type: AgGridAlpine
        properties:
          rowData:
            - title: One
              year: 2010
              viewerReviews: 30
            - title: Two
              year: 2011
              viewerReviews: 20
          defaultColDef:
            sortable: true
            resizable: true
            filter: true
          rowSelection: 'multiple'
          columnDefs:
            - headerName: Title
              field: title
              width: 350
              checkboxSelection: true
              headerCheckboxSelection: true
            - headerName: Year
              field: year
              width: 100
            - headerName: Viewer Reviews
              field: viewerReviews
              width: 160
              type: numericColumn
        events:
          onSelectionChanged:
            - id: set_selected
              type: SetState
              params:
                all_selected:
                  _event: selected
      - id: all_selected
        type: Title
        properties:
          level: 4
          content:
            _if: # Show the event data in a title, or call to action.
              test:
                _eq:
                  - _state: all_selected
                  - null
              then: 'Select rows.'
              else:
                _string.concat:
                  - 'Total Selected: '
                  - _array.length:
                      _state: all_selected
```

## Other Lowdefy Blocks Packages

- [@lowdefy/blocks-template](https://github.com/lowdefy/blocks-template): Lowdefy template for creating blocks.
- [@lowdefy/blocks-basic](https://github.com/lowdefy/lowdefy/tree/main/packages/blocks/blocksBasic): Official Lowdefy blocks some basic Html elements.
- [@lowdefy/blocks-antd](https://github.com/lowdefy/lowdefy/tree/main/packages/blocks/blocksAntd): Official Lowdefy blocks for [Antd design](https://ant.design/).
- [@lowdefy/blocks-color-selectors](https://github.com/lowdefy/lowdefy/tree/main/packages/blocks/blocksColorSelectorsd): Official Lowdefy blocks for [react-color](https://casesandberg.github.io/react-color/).
- [@lowdefy/blocks-markdown](https://github.com/lowdefy/lowdefy/tree/main/packages/blocks/blocksMarkdown): Official Lowdefy blocks to render Markdown.
- [@lowdefy/blocks-amcharts](https://github.com/lowdefy/blocks-amcharts): Lowdefy blocks to render [AmCharts v4](https://www.amcharts.com/).

## More Lowdefy resources

- Getting started with Lowdefy - https://docs.lowdefy.com/tutorial-start
- Lowdefy docs - https://docs.lowdefy.com
- Lowdefy website - https://lowdefy.com
- Community forum - https://github.com/lowdefy/lowdefy/discussions
- Bug reports and feature requests - https://github.com/lowdefy/lowdefy/issues

## Licence

[Apache-2.0](https://github.com/lowdefy/blocks-amcharts/blob/main/LICENSE)
