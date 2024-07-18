// Script.js
// create a new QRCode instance
let qrcode = new QRCode(document.querySelector(".qrcode"));

// Initial QR code generation
// with a default message
qrcode.makeCode("Why did you scan me?");

const input = document.getElementById("file-input");

input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const excelData = await readXlsxFile(file);
  const columnNames = excelData.shift();
  const data = excelData.map((row) => {
    let obj = {};
    row.forEach((cell, index) => {
      obj[columnNames[index]] = cell;
    });
    return obj;
  });
  for (let i = 0; i < data.length; ++i) {
    setTimeout(() => {
      qrcode.makeCode(JSON.stringify(data[i]));
    }, i * 5000);
  }
});
