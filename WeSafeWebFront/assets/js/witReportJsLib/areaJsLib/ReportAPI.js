function ReportDataTransformSingle(data) {
    if (data)
        if (data.code) {
            return data.data;
        }
        else {
            alert(data.message);
        }
    else
        alert("未获取到数据。")
}

function ReportDataTransformList(data) {
    if (data)
        if (data.code) {
            return data.items;
        }
        else {
            alert(data.message);
        }
    else
        alert("未获取到数据。")
}