function startSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (!query) {
        container.innerHTML = '<p>يرجى إدخال كلمة للبحث.</p>';
        return;
    }

    const files = [];
    for (let year = 2019; year <= 2100; year++) {
        files.push(`space/file${year}.html`);
    }

    let found = false;

    files.forEach(file => {
        fetch(file)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const rows = doc.querySelectorAll('table tr');

                rows.forEach(row => {
                    const rowText = row.innerText.toLowerCase();
                    if (rowText.includes(query)) {
                        found = true;
                        const clonedRow = row.cloneNode(true);
                        clonedRow.classList.add('highlight');

                        const table = document.createElement('table');
                        const caption = document.createElement('caption');
                        caption.textContent = `من الملف: ${file}`;
                        caption.style = "caption-side: top; font-weight: bold; padding: 5px;";
                        table.appendChild(caption);
                        table.appendChild(clonedRow);

                        container.appendChild(table);
                    }
                });
            });
    });

    setTimeout(() => {
        if (!found) container.innerHTML = '<p>لم يتم العثور على نتائج.</p>';
    }, 1000);
}

function printResults() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>نتائج البحث</title></head>
        <body>${document.getElementById('resultsContainer').innerHTML}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
}
