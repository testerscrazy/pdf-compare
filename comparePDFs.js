const fs = require('fs');
const pdf = require('pdf-parse');
const diff = require('diff');

function readPDFText(path) {
    const dataBuffer = fs.readFileSync(path);
    return pdf(dataBuffer).then(function(data) {
        return data.text;
    });
}

async function comparePDFs(path1, path2) {
    const text1 = await readPDFText(path1);
    const text2 = await readPDFText(path2);

    const textDiff = diff.diffWords(text1, text2);
    let isDifferent = false;
    textDiff.forEach(part => {
        if (part.added || part.removed) {
            isDifferent = true;
        }
    });
    if (isDifferent) {
        console.log('different');
    } else {
        console.log('same');
    }
}

comparePDFs('sample-1.pdf', 'sample-3.pdf').catch(err => {
    console.error('Error comparing PDFs:', err);
});
