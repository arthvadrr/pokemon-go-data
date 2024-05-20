class SortableTable {
    constructor(tableId) {
        this.table = document.getElementById(tableId);
        this.tableHead = this.table.querySelector('thead');
        this.tableBody = this.table.querySelector('tbody');

        this.attachEventListeners();
    }

    attachEventListeners() {
        this.tableHead.addEventListener('click', event => {
            if (event.target.classList.contains('sortable')) {
                const column = event.target.dataset.column;
                this.sortTable(column);
            }
        });
    }

    sortTable(column) {
        const rows = Array.from(this.tableBody.querySelectorAll('tr'));
        const sortType = isNaN(rows[0].children[column].innerText) ? 'string' : 'number';

        rows.sort((a, b) => {
            const valueA = a.children[column].innerText;
            const valueB = b.children[column].innerText;

            if (sortType === 'string') {
                return valueA.localeCompare(valueB);
            } else {
                return parseFloat(valueA) - parseFloat(valueB);
            }
        });

        this.tableBody.innerHTML = '';
        rows.forEach(row => {
            this.tableBody.appendChild(row);
        });
    }
}

const sortableTable = new SortableTable('pokemonTable');
