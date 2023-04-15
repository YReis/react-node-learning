const pdfjs = require("pdfjs-dist/legacy/build/pdf");

async function getTextContent(src) {
  const doc = await pdfjs.getDocument(src).promise;
  const page = await doc.getPage(1);
  return await page.getTextContent();
}

async function leitor(src, callback) {
  const pdfContent = await getTextContent(src);
  if (pdfContent) {
    console.log(pdfContent);
    pdfContent.items.map((eo, i) => {
      console.log(`${i}, ${eo.str}`);
    });
    return callback(pdfContent.items[19].str);
  }
}

module.exports = { leitor };
