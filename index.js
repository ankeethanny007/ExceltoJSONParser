let uploadedExcelFile;
document.getElementById('json-file-uploader').addEventListener("change", event => {
    uploadedExcelFile = event.target.files[0];
    console.log(uploadedExcelFile);
})

document.getElementById('json-file-submit').addEventListener("click", event => {
    if (uploadedExcelFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(uploadedExcelFile);
        fileReader.onload = (event) => {
            // console.log(event.target.result);
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
                console.log(rowObject);
                download(JSON.stringify(rowObject), uploadedExcelFile.name.split(".")[0] + ".json", "text/plain");
            });
        }
    }
})

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}