function handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const processedContent = processCsv(content);
        const processedFileName = getProcessedFileName(file.name);
        createDownloadLink(processedContent, processedFileName);
    };

    reader.readAsText(file, 'UTF-8');
}

function getProcessedFileName(originalFileName) {
    // 拡張子を取り除き、'_processed' を追加
    return originalFileName.replace(/\.[^/.]+$/, '') + '_processed.csv';
}

function processCsv(csvContent) {
    const rows = csvContent.split('\n');
    const headers = rows[0].split(',');

    // ヘッダーの置き換え
    const newHeaders = ['1', 'oder', '2', 'ship', '3', '4', '5', '6', '7', '8', '9', '10']; // 新しいヘッダー
    rows[0] = newHeaders.join(',');

    // ヘッダーとデータ行の両方で、2列目と4列目のみを保持
    const processedRows = rows.map(row => {
        const columns = row.split(',');
        return [columns[1], columns[3]].join(','); // 2列目と4列目のみ選択
    });

    return processedRows.join('\n');
}

function createDownloadLink(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.style.display = 'block';
    downloadLink.href = url;
    downloadLink.download = fileName;
}
