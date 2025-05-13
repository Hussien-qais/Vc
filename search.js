function searchFiles() {
    const query = document.getElementById("searchQuery").value.toLowerCase();
    const searchInFiles = document.getElementById("searchInFiles").checked;
    const searchInPDF = document.getElementById("searchInPDF").checked;
    const searchInWord = document.getElementById("searchInWord").checked;
    const resultsContainer = document.getElementById("resultsContainer");

    resultsContainer.innerHTML = ""; // Clear previous results

    if (searchInFiles) {
        searchInHtmlFiles(query, resultsContainer);
    }

    if (searchInPDF) {
        searchInPdfFiles(query, resultsContainer);
    }

    if (searchInWord) {
        searchInWordFiles(query, resultsContainer);
    }
}

function searchInHtmlFiles(query, container) {
    const files = ["file2019.html", "file2020.html", "file2021.html", "file2022.html"]; // أضف ملفاتك هنا
    let foundResults = false;

    files.forEach((file) => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                if (data.toLowerCase().includes(query)) {
                    foundResults = true;
                    const resultDiv = document.createElement("div");
                    resultDiv.classList.add("result-item");
                    resultDiv.innerHTML = `<p>تم العثور على نتيجة في الملف: ${file}</p>`;
                    container.appendChild(resultDiv);
                }
            })
            .catch(error => console.error('Error fetching file:', error));
    });

    if (!foundResults) {
        const noResults = document.createElement("div");
        noResults.innerHTML = "<p>لا توجد نتائج للبحث.</p>";
        container.appendChild(noResults);
    }
}

function searchInPdfFiles(query, container) {
    // منطق البحث في ملفات PDF باستخدام مكتبة مثل pdf.js
    // قم بكتابة الكود هنا للتعامل مع ملفات PDF
}

function searchInWordFiles(query, container) {
    // منطق البحث في ملفات Word باستخدام مكتبة مثل mammoth.js
    // قم بكتابة الكود هنا للتعامل مع ملفات Word
}
