# Lowdefy Blocks for Ag-Grid

This repository provides blocks for [Ag-Grid](https://www.ag-grid.com/), a feature rich javascript grid amd table library.

The implementation of these blocks is a minimal wrapper for the [@ag-grid-community/core
](https://www.npmjs.com/package/@ag-grid-community/core) package. This means you write normal Ag-Grid config to create tables.

See the [Ag-Grid docs](https://www.ag-grid.com/documentation/react/getting-started/) for the table settings API.

## Blocks

Block types for supported [Ag-Grid themes](https://www.ag-grid.com/documentation/javascript/themes-provided/) are available.

### Block type Urls

The block types are hosted at:

- `AgGrigAlpine`: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGrigAlpine.json
- `AgGrigAlpineDark`: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGrigAlpineDark.json
- `AgGrigBalham`: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGrigBalham.json
- `AgGrigBalhamDark`: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGrigBalhamDark.json
- `AgGrigMaterial`: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGrigMaterial.json

### Events

- `onRowClick`: Trigger event when a row is clicked and pass `row: object` and `selected: object[]` row data to action `_event`.
- `onCellClick`:Trigger event when a cell is clicked and pass `row: object`, `cell: object` and `selected: object[]` row data to action `_event`.

### AgGrigAlpine Example

```yaml
name: my-app
lowdefy: 3.10.1
types:
  AgGrigAlpine:
    url: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGrigAlpine.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_table
        type: AgGridAlpine
        properties:
          theme: basic
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

### AgGrigAlpine valueFormatter: \_function Example

```yaml
name: my-app
lowdefy: 3.10.1
types:
  AgGrigAlpine:
    url: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGrigAlpine.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_table
        type: AgGridAlpine
        properties:
          theme: basic
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

### AgGrigAlpine onRowClick Example

```yaml
name: my-app
lowdefy: 3.10.1
types:
  AgGrigAlpine:
    url: https://blocks-cdn.lowdefy.com/v3.10.1/blocks-aggrid/meta/AgGrigAlpine.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_table
        type: AgGridAlpine
        properties:
          theme: basic
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
