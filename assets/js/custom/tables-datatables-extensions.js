/**
 * DataTables Extensions (js)
 */

'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  const dt_scrollable_table = document.querySelector('.dt-scrollableTable');
  let dt_scrollableTable;

  // Scrollable
  // --------------------------------------------------------------------

  if (dt_scrollable_table) {
    dt_scrollableTable = new DataTable(dt_scrollable_table, {
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: 'No' },
        { data: 'shopping_cart' },
        { data: 'packing_no' },
        { data: 'city' },
        { data: 'order_date' },
        { data: 'product_name' },
        { data: 'product_name_kr' },
        { data: 'option_code' },
        { data: 'option_info' },
        { data: 'currency' },
        { data: 'quantity' },
        { data: 'total_selling_price' },
        { data: 'product_code' }
      ],
      columnDefs: [
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            const statusNumber = full.status;
            const statuses = {
              1: { title: 'Current', class: 'bg-label-primary' },
              2: { title: 'Professional', class: 'bg-label-success' },
              3: { title: 'Rejected', class: 'bg-label-danger' },
              4: { title: 'Resigned', class: 'bg-label-warning' },
              5: { title: 'Applied', class: 'bg-label-info' }
            };

            if (typeof statuses[statusNumber] === 'undefined') {
              return data;
            }

            return `
              <span class="badge ${statuses[statusNumber].class}">
                ${statuses[statusNumber].title}
              </span>
            `;
          },
          columnDefs: [
            {
              defaultContent: '-',
              targets: '_all'
            }
          ]
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          searchable: false,
          className: 'd-flex align-items-center',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded icon-base"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              '</div>' +
              '</div>' +
              '<a href="javascript:;" class="item-edit text-body"><i class="bx bxs-edit icon-base"></i></a>'
            );
          }
        }
      ],
      // Scroll options
      scrollY: '300px',
      scrollX: true,
      layout: {
        bottomStart: {
          rowClass: 'row mx-3 my-0 justify-content-between',
          features: [
            {
              pageLength: {
                menu: [7, 10, 25, 50, 100],
                text: 'Show_MENU_entries'
              }
            }
          ]
        },
        topEnd: {
          search: {
            placeholder: '검색어를 입력해주세요.'
          }
        },
        toptart: {
          rowClass: 'row mx-3 justify-content-between',
          features: ['info']
        },
        bottomEnd: {
          paging: {
            firstLast: false
          }
        }
      },
      language: {
        paginate: {
          next: '<i class="icon-base bx bx-chevron-right scaleX-n1-rtl icon-sm"></i>',
          previous: '<i class="icon-base bx bx-chevron-left scaleX-n1-rtl icon-sm"></i>'
        }
      },
      initComplete: function (settings, json) {
        // Add the mti-n1 class to the first row in tbody
        dt_scrollable_table.querySelector('tbody tr:first-child').classList.add('border-top-0');
      }
    });
  }

  // FixedHeader
  // --------------------------------------------------------------------

  const dt_fixedheader_table = document.querySelector('.dt-fixedheader');
  let dt_fixedheader;

  if (dt_fixedheader_table) {
    dt_fixedheader = new DataTable(dt_fixedheader_table, {
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: '' },
        { data: 'id', orderable: false, render: DataTable.render.select() },
        { data: 'No' },
        { data: 'shopping_cart' },
        { data: 'packing_no' },
        { data: 'city' },
        { data: 'order_date' },
        { data: 'product_name' },
        { data: 'product_name_kr' },
        { data: 'option_code' },
        { data: 'option_info' },
        { data: 'currency' },
        { data: 'quantity' },
        { data: 'total_selling_price' },
        { data: 'product_code' }
      ],
      columnDefs: [
        {
          className: 'control',
          orderable: false,
          targets: 0,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          },
          responsivePriority: 4
        },
        {
          targets: 2,
          visible: false
        },
        {
          // Avatar image/badge, Name and post
          targets: 3,
          render: function (data, type, full, meta) {
            const userImg = full.avatar;
            const name = full.full_name;
            const post = full.post;
            let output;

            if (userImg) {
              // For Avatar image
              output = `<img src="${assetsPath}img/avatars/${userImg}" alt="Avatar" class="rounded-circle">`;
            } else {
              // For Avatar badge
              const stateNum = Math.floor(Math.random() * 6);
              const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              const state = states[stateNum];
              const initials = (name.match(/\b\w/g) || []).map(i => i.toUpperCase()).join('');
              output = `<span class="avatar-initial rounded-circle bg-label-${state}">${initials}</span>`;
            }

            // Creates full output for row
            const rowOutput = `
              <div class="d-flex justify-content-start align-items-center">
                <div class="avatar-wrapper">
                  <div class="avatar me-2">
                    ${output}
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <span class="emp_name text-truncate">${name}</span>
                  <small class="emp_post text-truncate text-body-secondary">${post}</small>
                </div>
              </div>
            `;

            return rowOutput;
          },
          responsivePriority: 5
        },
        {
          responsivePriority: 1,
          targets: 4
        },
        {
          responsivePriority: 2,
          targets: 6
        },

        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            const statusNumber = full.status;
            const statuses = {
              1: { title: 'Current', class: 'bg-label-primary' },
              2: { title: 'Professional', class: 'bg-label-success' },
              3: { title: 'Rejected', class: 'bg-label-danger' },
              4: { title: 'Resigned', class: 'bg-label-warning' },
              5: { title: 'Applied', class: 'bg-label-info' }
            };

            if (typeof statuses[statusNumber] === 'undefined') {
              return data;
            }

            return `
              <span class="badge ${statuses[statusNumber].class}">
                ${statuses[statusNumber].title}
              </span>
            `;
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          className: 'd-flex align-items-center',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded icon-base"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              '</div>' +
              '</div>' +
              '<a href="javascript:;" class="btn btn-icon item-edit"><i class="bx bxs-edit icon-base"></i></a>'
            );
          }
        }
      ],
      select: {
        style: 'multi',
        selector: 'td:nth-child(2)'
      },
      order: [[2, 'desc']],
      layout: {
        topStart: {
          rowClass: 'row mx-3 my-0 justify-content-between',
          features: [
            {
              pageLength: {
                menu: [7, 10, 25, 50, 100],
                text: 'Show_MENU_entries'
              }
            }
          ]
        },
        topEnd: {
          search: {
            placeholder: '-'
          }
        },
        bottomStart: {
          rowClass: 'row mx-3 justify-content-between',
          features: ['info']
        },
        bottomEnd: {
          paging: {
            firstLast: false
          }
        }
      },
      displayLength: 7,
      language: {
        paginate: {
          next: '<i class="icon-base bx bx-chevron-right scaleX-n1-rtl icon-sm"></i>',
          previous: '<i class="icon-base bx bx-chevron-left scaleX-n1-rtl icon-sm"></i>'
        }
      },
      responsive: {
        details: {
          display: DataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            const data = columns
              .map(function (col) {
                return col.title !== '' // Do not show row in modal popup if title is blank (for check box)
                  ? `<tr data-dt-row="${col.rowIndex}" data-dt-column="${col.columnIndex}">
                      <td>${col.title}:</td>
                      <td>${col.data}</td>
                    </tr>`
                  : '';
              })
              .join('');

            if (data) {
              const div = document.createElement('div');
              div.classList.add('table-responsive');
              const table = document.createElement('table');
              div.appendChild(table);
              table.classList.add('table');
              const tbody = document.createElement('tbody');
              tbody.innerHTML = data;
              table.appendChild(tbody);
              return div;
            }
            return false;
          }
        }
      }
    });
    // Fixed header
    if (window.Helpers.isNavbarFixed()) {
      const navHeight = document.getElementById('layout-navbar').offsetHeight;
      new DataTable.FixedHeader(dt_fixedheader).headerOffset(navHeight);
    } else {
      new DataTable.FixedHeader(dt_fixedheader);
    }

    //? The 'delete-record' class is necessary for the functionality of the following code.
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('delete-record')) {
        dt_fixedheader.row(e.target.closest('tr')).remove().draw();
        const modalEl = document.querySelector('.dtr-bs-modal');
        if (modalEl && modalEl.classList.contains('show')) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          modal?.hide();
        }
      }
    });
  }

  // FixedColumns
  // --------------------------------------------------------------------

  const dt_fixedcolumns_table = document.querySelector('.dt-fixedcolumns');
  let dt_fixedcolumns;

  if (dt_fixedcolumns_table) {
    let tableTitle = document.createElement('h5');
    tableTitle.classList.add('card-title', 'mb-0', 'text-md-start', 'text-center', 'pb-md-0', 'pb-6');
    tableTitle.innerHTML = 'Fixed Columns';
    dt_fixedcolumns = new DataTable(dt_fixedcolumns_table, {
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: 'No' },
        { data: 'shopping_cart' },
        { data: 'packing_no' },
        { data: 'city' },
        { data: 'order_date' },
        { data: 'product_name' },
        { data: 'product_name_kr' },
        { data: 'option_code' },
        { data: 'option_info' },
        { data: 'currency' },
        { data: 'quantity' },
        { data: 'total_selling_price' },
        { data: 'product_code' }
      ],
      columnDefs: [
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            const statusNumber = full.status;
            const statuses = {
              1: { title: 'Current', class: 'bg-label-primary' },
              2: { title: 'Professional', class: 'bg-label-success' },
              3: { title: 'Rejected', class: 'bg-label-danger' },
              4: { title: 'Resigned', class: 'bg-label-warning' },
              5: { title: 'Applied', class: 'bg-label-info' }
            };

            if (typeof statuses[statusNumber] === 'undefined') {
              return data;
            }

            return `
              <span class="badge ${statuses[statusNumber].class}">
                ${statuses[statusNumber].title}
              </span>
            `;
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          searchable: false,
          className: 'd-flex align-items-center',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded icon-base"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record"></i>Delete</a>' +
              '</div>' +
              '</div>' +
              '<a href="javascript:;" class="item-edit text-body"><i class="bx bxs-edit icon-base"></i></a>'
            );
          }
        }
      ],
      layout: {
        topStart: {
          rowClass: 'row card-header pt-0 pb-0',
          features: [tableTitle]
        },
        topEnd: {
          search: {
            placeholder: '--'
          }
        },
        bottomStart: {
          rowClass: 'row mx-3 justify-content-between',
          features: ['info']
        },
        bottomEnd: {
          paging: {
            firstLast: false
          }
        }
      },
      scrollY: 300,
      scrollX: true,
      scrollCollapse: true,
      paging: false,
      info: false,
      // Fixed column option
      fixedColumns: {
        start: 1
      },
      initComplete: function (settings, json) {
        // Add the mti-n1 class to the first row in tbody
        dt_fixedcolumns_table.querySelector('tbody tr:first-child').classList.add('border-top-0');
      }
    });

    //? The 'delete-record' class is necessary for the functionality of the following code.
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('delete-record')) {
        dt_fixedcolumns.row(e.target.closest('tr')).remove().draw();
        const modalEl = document.querySelector('.dtr-bs-modal');
        if (modalEl && modalEl.classList.contains('show')) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          modal?.hide();
        }
      }
    });
  }

  // Select
  // --------------------------------------------------------------------

  const dt_select_table = document.querySelector(
    '.dt-select-table:not(.dt-shipping-register-hand, .dt-shipping-register-auto)'
  );
  let dt_select;
  if (dt_select_table) {
    dt_select = new DataTable(dt_select_table, {
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: 'id', orderable: false, render: DataTable.render.select() },
        { data: 'No' },
        { data: 'shopping_cart' },
        { data: 'packing_no' },
        { data: 'city' },
        { data: 'order_date' },
        { data: 'product_name' },
        { data: 'product_name_kr' },
        { data: 'option_code' },
        { data: 'option_info' },
        { data: 'currency' },
        { data: 'quantity' },
        { data: 'total_selling_price' }
      ],
      columnDefs: [
        {
          // For Checkboxes
          targets: 0,
          searchable: false,
          orderable: false,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectRow: true,
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          }
          // },
          // {
          //   // Label
          //   targets: -1,
          //   render: function (data, type, full, meta) {
          //     const statusNumber = full.status;
          //     const statuses = {
          //       1: { title: 'Current', class: 'bg-label-primary' },
          //       2: { title: 'Professional', class: 'bg-label-success' },
          //       3: { title: 'Rejected', class: 'bg-label-danger' },
          //       4: { title: 'Resigned', class: 'bg-label-warning' },
          //       5: { title: 'Applied', class: 'bg-label-info' }
          //     };

          //     if (typeof statuses[statusNumber] === 'undefined') {
          //       return data;
          //     }

          //     return `
          //       <span class="badge ${statuses[statusNumber].class}">
          //         ${statuses[statusNumber].title}
          //       </span>
          //     `;
          //   }
        },
        {
          defaultContent: '-',
          targets: '_all'
        }
      ],
      order: [[1, 'desc']],
      layout: {
        bottomStart: {
          rowClass: 'row mx-3 my-0 justify-content-between',
          features: [
            {
              pageLength: {
                menu: [10, 25, 50, 100],
                text: '_MENU_개씩 보기'
              }
            }
          ]
        },
        topEnd: {
          search: {
            placeholder: '검색어를 입력해주세요.',
            text: '_INPUT_'
          },
          buttons: [
            { text: '저장', name: 'primary', className: 'btn btn-outline-primary' },
            { text: '삭제', className: 'btn btn-outline-danger' },
            { text: '다운로드', className: 'btn btn-outline-success' }
          ]
        },
        topStart: {
          info: {
            text: '검색 건수: _TOTAL_건'
          }
        },
        bottomEnd: {
          paging: {
            firstLast: false
          }
        }
      },
      language: {
        paginate: {
          next: '<i class="icon-base bx bx-chevron-right scaleX-n1-rtl icon-sm"></i>',
          previous: '<i class="icon-base bx bx-chevron-left scaleX-n1-rtl icon-sm"></i>'
        }
      },
      select: {
        // Select style
        style: 'multi'
      }
    });
  }
  const dt_shipping_register_hand_table = document.querySelector('.dt-shipping-register-hand');
  let dt_shipping_register_hand;

  if (dt_shipping_register_hand_table) {
    dt_shipping_register_hand = new DataTable(dt_shipping_register_hand_table, {
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: 'id', orderable: false, render: DataTable.render.select() },
        { data: 'No' },
        { data: 'shopping_cart' },
        { data: 'packing_no' },
        { data: 'city' },
        { data: 'order_date' },
        { data: 'product_name' },
        { data: 'product_name_kr' },
        { data: 'option_code' },
        { data: 'option_info' },
        { data: 'currency' },
        { data: 'quantity' },
        { data: 'total_selling_price' }
      ],
      columnDefs: [
        {
          // For Checkboxes
          targets: 0,
          searchable: false,
          orderable: false,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectRow: true,
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          }
          // },
          // {
          //   // Label
          //   targets: -1,
          //   render: function (data, type, full, meta) {
          //     const statusNumber = full.status;
          //     const statuses = {
          //       1: { title: 'Current', class: 'bg-label-primary' },
          //       2: { title: 'Professional', class: 'bg-label-success' },
          //       3: { title: 'Rejected', class: 'bg-label-danger' },
          //       4: { title: 'Resigned', class: 'bg-label-warning' },
          //       5: { title: 'Applied', class: 'bg-label-info' }
          //     };

          //     if (typeof statuses[statusNumber] === 'undefined') {
          //       return data;
          //     }

          //     return `
          //       <span class="badge ${statuses[statusNumber].class}">
          //         ${statuses[statusNumber].title}
          //       </span>
          //     `;
          //   }
        },
        {
          defaultContent: '-',
          targets: '_all'
        }
      ],
      order: [[1, 'desc']],
      layout: {
        bottomStart: {
          rowClass: 'row mx-3 my-0 justify-content-between',
          features: [
            {
              pageLength: {
                menu: [10, 25, 50, 100],
                text: '_MENU_개씩 보기'
              }
            }
          ]
        },
        topEnd: {
          search: {
            placeholder: '검색어를 입력해주세요.',
            text: '_INPUT_'
          },
          buttons: [
            { text: '저장', name: 'primary', className: 'btn btn-outline-primary' },
            { text: '삭제', className: 'btn btn-outline-danger' },
            { text: '다운로드', className: 'btn btn-outline-success table-download-btn' }
          ]
        },
        topStart: {
          info: {
            text: '검색 건수: _TOTAL_건'
          }
        },
        bottomEnd: {
          paging: {
            firstLast: false
          }
        }
      },
      language: {
        paginate: {
          next: '<i class="icon-base bx bx-chevron-right scaleX-n1-rtl icon-sm"></i>',
          previous: '<i class="icon-base bx bx-chevron-left scaleX-n1-rtl icon-sm"></i>'
        }
      },
      select: {
        // Select style
        style: 'multi'
      }
    });
  }

  const dt_shipping_register_auto_table = document.querySelector('.dt-shipping-register-auto');
  let dt_shipping_register_auto;

  if (dt_shipping_register_auto_table) {
    dt_shipping_register_auto = new DataTable(dt_shipping_register_auto_table, {
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: 'id', orderable: false, render: DataTable.render.select() },
        { data: 'No' },
        { data: 'shopping_cart' },
        { data: 'packing_no' },
        { data: 'city' },
        { data: 'order_date' },
        { data: 'product_name' },
        { data: 'product_name_kr' },
        { data: 'option_code' },
        { data: 'option_info' },
        { data: 'currency' },
        { data: 'quantity' },
        { data: 'total_selling_price' }
      ],
      columnDefs: [
        {
          // For Checkboxes
          targets: 0,
          searchable: false,
          orderable: false,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectRow: true,
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          }
          // },
          // {
          //   // Label
          //   targets: -1,
          //   render: function (data, type, full, meta) {
          //     const statusNumber = full.status;
          //     const statuses = {
          //       1: { title: 'Current', class: 'bg-label-primary' },
          //       2: { title: 'Professional', class: 'bg-label-success' },
          //       3: { title: 'Rejected', class: 'bg-label-danger' },
          //       4: { title: 'Resigned', class: 'bg-label-warning' },
          //       5: { title: 'Applied', class: 'bg-label-info' }
          //     };

          //     if (typeof statuses[statusNumber] === 'undefined') {
          //       return data;
          //     }

          //     return `
          //       <span class="badge ${statuses[statusNumber].class}">
          //         ${statuses[statusNumber].title}
          //       </span>
          //     `;
          //   }
        },
        {
          defaultContent: '-',
          targets: '_all'
        }
      ],
      order: [[1, 'desc']],
      layout: {
        bottomStart: {
          rowClass: 'row mx-3 my-0 justify-content-between',
          features: [
            {
              pageLength: {
                menu: [10, 25, 50, 100],
                text: '_MENU_개씩 보기'
              }
            }
          ]
        },
        topEnd: {
          search: {
            placeholder: '검색어를 입력해주세요.',
            text: '_INPUT_'
          },
          buttons: [
            { text: '저장', name: 'primary', className: 'btn btn-outline-primary' },
            { text: '삭제', className: 'btn btn-outline-danger' },
            { text: '다운로드', className: 'btn btn-outline-success' }
          ]
        },
        topStart: {
          info: {
            text: '검색 건수: _TOTAL_건'
          }
        },
        bottomEnd: {
          paging: {
            firstLast: false
          }
        }
      },
      language: {
        paginate: {
          next: '<i class="icon-base bx bx-chevron-right scaleX-n1-rtl icon-sm"></i>',
          previous: '<i class="icon-base bx bx-chevron-left scaleX-n1-rtl icon-sm"></i>'
        }
      },
      select: {
        // Select style
        style: 'multi'
      }
    });
  }

  const dt_notice_list_table = document.querySelector('.dt-notice-list');
  let dt_notice_list;

  if (dt_notice_list_table) {
    dt_notice_list = new DataTable(dt_notice_list_table, {
      ajax: assetsPath + 'json/table-datatable.json',
      columns: [
        { data: 'id', orderable: false, render: DataTable.render.select() },
        { data: 'No' },
        { data: 'shopping_cart' },
        { data: 'packing_no' },
        { data: 'city' },
        { data: 'order_date' },
        { data: 'product_name' },
        { data: 'product_name_kr' },
        { data: 'option_code' },
        { data: 'option_info' },
        { data: 'currency' },
        { data: 'quantity' },
        { data: 'total_selling_price' }
      ],
      columnDefs: [
        {
          // For Checkboxes
          targets: 0,
          searchable: false,
          orderable: false,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectRow: true,
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          }
        },
        {
          defaultContent: '-',
          targets: '_all'
        }
      ],
      order: [[1, 'desc']],
      layout: {
        bottomStart: {
          rowClass: 'row mx-3 my-0 justify-content-between',
          features: [
            {
              pageLength: {
                menu: [10, 25, 50, 100],
                text: '_MENU_개씩 보기'
              }
            }
          ]
        },
        topEnd: {
          search: {
            placeholder: '검색어를 입력해주세요.',
            text: '_INPUT_'
          },
          buttons: [
            { text: '저장', name: 'primary', className: 'btn btn-outline-primary' },
            { text: '삭제', className: 'btn btn-outline-danger' },
            { text: '다운로드', className: 'btn btn-outline-success table-download-btn' }
          ]
        },
        topStart: {
          info: {
            text: '검색 건수: _TOTAL_건'
          }
        },
        bottomEnd: {
          paging: {
            firstLast: false
          }
        }
      },
      destroy: true,
      language: {
        emptyTable: '데이터가 없습니다.',
        zeroRecords: '검색된 결과가 없습니다.',
        lengthMenu: '페이지당 _MENU_ 개씩 보기',
        info: '_TOTAL_개의 항목 중 _START_에서 _END_까지 표시',
        infoEmpty: '항목이 없습니다.',
        infoFiltered: '(총 _MAX_개 항목 중 필터링됨)', // 🔹 검색 결과 문구 변경
        search: '검색: ',
        paginate: {
          next: '<i class="icon-base bx bx-chevron-right scaleX-n1-rtl icon-sm"></i>',
          previous: '<i class="icon-base bx bx-chevron-left scaleX-n1-rtl icon-sm"></i>'
        }
      },
      select: {
        // Select style
        style: 'multi'
      }
    });

    // ✅ 공지사항 > 테이블 분류 검색 필터
    const filterButtons = document.querySelectorAll('.table-filter-btn');

    // 버튼 클릭 이벤트 추가
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        let filterValue = this.getAttribute('data-filter');

        // 모든 버튼 스타일 초기화
        filterButtons.forEach(btn => {
          btn.classList.remove('btn-primary', 'active');
          btn.classList.add('btn-outline-primary');
        });

        // 클릭한 버튼 스타일 변경
        this.classList.remove('btn-outline-primary');
        this.classList.add('btn-primary', 'active');

        // 테이블 필터링 적용
        if (filterValue === '') {
          dt_notice_list.search('').draw(); // 전체 보기
        } else {
          dt_notice_list.search(filterValue).draw(); // 선택한 분류로 필터 적용
        }
      });
    });

    // Filter form control to default size
    // ? setTimeout used for multilingual table initialization
    setTimeout(() => {
      const elementsToModify = [
        { selector: '.dt-search .form-control', classToRemove: 'form-control-sm', classToAdd: 'ms-4' },
        { selector: '.dt-length .form-select', classToRemove: 'form-select-sm' },
        { selector: '.dt-layout-table', classToRemove: 'row mt-2' },
        { selector: '.dt-layout-end', classToAdd: 'mt-0' },
        { selector: '.dt-layout-end .dt-search', classToAdd: 'mt-0 mt-md-6' }
      ];

      // Delete record
      elementsToModify.forEach(({ selector, classToRemove, classToAdd }) => {
        document.querySelectorAll(selector).forEach(element => {
          if (classToRemove) {
            classToRemove.split(' ').forEach(className => element.classList.remove(className));
          }
          if (classToAdd) {
            classToAdd.split(' ').forEach(className => element.classList.add(className));
          }
        });
      });

      // 로컬스토리지에서 '그만보기' 데이터 확인
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      if (!localStorage.getItem('hideNotice_' + today)) {
        console.log('공지사항을 표시합니다.');
      }

      const tableBody = document.querySelector('.dt-notice-list tbody');
      const modal = document.getElementById('noticeModal');
      const modalTitle = document.getElementById('modalTitle');
      const modalContent = document.getElementById('modalContent');
      const hideNoticeCheckbox = document.getElementById('hideNotice');
      const closeModalButton = document.getElementById('closeModal');

      // 🔹 테이블 3번째 열 (city) 클릭 시 모달 표시
      tableBody.addEventListener('click', function (event) {
        let target = event.target;

        // td 요소인지 확인하고, 부모 row(tr)의 모든 td 가져오기
        if (target.tagName === 'TD') {
          let row = target.closest('tr'); // 클릭된 td의 부모 tr 찾기
          let cells = row.cells;

          // 3번째 열 (인덱스 2) 클릭 시
          if (cells[2] === target) {
            // 제목과 내용을 직접 가져옴
            let title = cells[2].innerText || ''; // 제목
            let content = cells[3].innerText || ''; // 내용 (다른 열에 내용이 있을 경우 조정)

            if (title && content) {
              modalTitle.textContent = title; // 제목 표시
              modalContent.textContent = content; // 내용 표시
              hideNoticeCheckbox.checked = false; // 체크박스 초기화

              // 모달의 aria-hidden 속성 처리
              const modalElement = document.getElementById('noticeModal');
              modalElement.setAttribute('aria-hidden', 'false'); // aria-hidden="false"

              // Bootstrap 5 모달을 열기
              const myModal = new bootstrap.Modal(modalElement);
              myModal.show(); // 모달 보이기
            }
          }
        }
      });

      // 🔹 닫기 버튼 클릭 시 모달 닫기
      closeModalButton.addEventListener('click', function () {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        if (hideNoticeCheckbox.checked) {
          localStorage.setItem('hideNotice_' + today, 'true');
        }
        modal.style.display = 'none';
      });

      // 🔹 모달 바깥 영역 클릭 시 닫기
      window.addEventListener('click', function (event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    }, 100);
  }
});
