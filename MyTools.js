'use strict'
const fs = require('fs');

let panjangArgument = process.argv.length
let targetExt = "text"
let index = process.argv.indexOf("-t")
let indexLokasi = process.argv.indexOf("-o")

if (process.argv[index] === '-t' && process.argv[index + 1] === "json") targetExt = "json"
if (process.argv[index] === '-t' && process.argv[index + 1] === null) console.log('null');
//console.log('length='+panjangArgument);
if (process.argv[2] === '-h') {
    showHelp()
} else if ([3, 4 , 5].includes(panjangArgument)) {
    bacaData(targetExt);
} else if (panjangArgument === 6 && indexLokasi !== null) {
    console.log("Destination file not specified")
} else if (indexLokasi !== -1) {
    console.log('process argv='+process.argv[indexLokasi+1])
    bacaDataDestinasi(targetExt, process.argv[indexLokasi + 1])
} else {
    console.log("Unknown Command")
}

/**
 * 
 * Function by Farisun
 */
function bacaData(format) {
    fs.readFile(process.argv[2], 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        
        if (format == "json") {
            convertToJson(data, '');
        } else {
            convertToText(data, '')
        }
    })
}

function bacaDataDestinasi(format, tujuan) {
    //console.log('nama file ='+process.argv[2]);
    fs.readFile(process.argv[2], 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log('sukses baca file 2');
        console.log('format='+format)
        if (format == "json") {
            convertToJson(data, tujuan);
        } else if (format == "text") {
            convertToText(data, tujuan)
        }
    })
}

function model(timestamp, type, id) {
    this.timestamp = timestamp;
    this.type = type;
    this.id = id;
}

function convertToJson(param, tujuan) {
    // console.log('isi file json');
    const dateObject = new Date();
    const date = (`0 ${dateObject.getDate()}`).slice(-2);
    // current month
    const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
    // current year
    const year = dateObject.getFullYear();
    // current hours
    const hours = dateObject.getHours();
    // current minutes
    const minutes = dateObject.getMinutes();
    // current seconds
    const seconds = dateObject.getSeconds();
    const waktuCetak = year + '_' + month + '_' + date + '_' + `${hours}${minutes}${seconds}`;
    //console.log('timestamp='+waktuCetak);
    var array = param.split("\n");
    var currentObj = "";
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        const isi = array[i].split(' ');
        var timeStamp = isi[0] + " " + isi[1];
        var type = isi[2];
        var id = isi[3].toString().replace(':', '');
        var jean1 = new model(timeStamp, type, id);
        newArray.push(jean1);
    }

    var json = JSON.stringify(newArray);
    //console.log(json);

    const fs = require('fs');    
    if (tujuan == '') {
        fs.writeFile("files\\json\\ConvertResult_'" + waktuCetak + "'.json", json, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("File tersimpan!");
        });
    } else {
        fs.writeFile(tujuan + "\\ConvertResult_'" + waktuCetak + "'.json", json, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("File tersimpan!");
        });

    }

}

function convertToText(param, tujuan) {
    //console.log('isi file json');
    const dateObject = new Date();
    const date = (`0 ${dateObject.getDate()}`).slice(-2);
    // current month
    const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
    // current year
    const year = dateObject.getFullYear();
    // current hours
    const hours = dateObject.getHours();
    // current minutes
    const minutes = dateObject.getMinutes();
    // current seconds
    const seconds = dateObject.getSeconds();
    const waktuCetak = year + '_' + month + '_' + date + '_' + `${hours}${minutes}${seconds}`;
    //console.log('timestamp='+waktuCetak);
    var array = param.split("\n");
    var currentObj = "";
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        const isi = array[i].split(' ');
        var timeStamp = isi[0] + " " + isi[1];
        var type = isi[2];
        var id = isi[3].toString().replace(':', '');
        var jean1 = new model(timeStamp, type, id);
        newArray.push(jean1);
    }

    var json = JSON.stringify(newArray);
    //console.log(json);

    const fs = require('fs');
    if (tujuan == '') {
        fs.writeFile("files\\txt\\ConvertResult_'" + waktuCetak + "'.txt", json, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("File Berhasil Disimpan!");
        });
    } else {
        fs.writeFile(tujuan + "\\ConvertResult_'" + waktuCetak + "'.txt", json, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("File Berhasil Disimpan!");
        });
    }
}

function showHelp() {
    console.log("=================================================================================================================================================================================================================")
    console.log("Cara Menggunakan Command");
    console.log("-t \t Command ini untuk tipe konversi file, terdapat 2 jenis tipe konversi yaitu json dan text. Secara default akan mengkonversi sebagai text.  \n\npenggunaan: -t json atau -t text.");
    console.log("\n-o \t Command ini untuk menyimpan file hasil konversi berdasarkan path yang diisi.  \n\npenggunaan: $ mytools /var/log/nginx/error.log -o path tujuan atau $ mytools /var/log/nginx/error.log -t json -o path tujuan");
    console.log("\ncatatan: setiap file txt akan terbentuk dalam folder txt pada directory project, setiap file json akan terbentuk dalam folder json pada directory project ")
    console.log("================================================================================================================================================================================")
}