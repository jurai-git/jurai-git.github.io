const textArea = document.querySelector('textarea');

textArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    textArea.classList.add('dragover');
});

textArea.addEventListener('dragleave', () => {
    textArea.classList.remove('dragover');
});

textArea.addEventListener('drop', (e) => {
    e.preventDefault();
    textArea.classList.remove('dragover');

    const file = e.dataTransfer.files[0];

    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const pdfData = new Uint8Array(e.target.result);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            let text = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');

                text += `${pageText}\n\n`;

                if (i >= 8)
                    break
            }
            textArea.value = text;
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Por favor, solte um arquivo PDF.');
    }
});