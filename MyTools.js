
'use strict'
const fs = require('fs');
var curdir = process.cwd();
const txtToJSON = require("txt-file-to-json");

//console.log('test:'+process.argv[3]);
console.log('current directory = '+curdir);

for (let j = 0; j< process.argv.length;j++){
   // console.log('input = '+j+'->'+(process.argv[j]));
    if(process.argv[j]=='-t' && process.argv[j+2]==null){
       if(process.argv[j+1] ==null){
        bacaData('text');
       }else{        
           if(process.argv[j+1]=="text"){
               //console.log('convert to text');
               bacaData('text');
           }else if(process.argv[j+1]=="json"){
               //console.log('convert to json');
               bacaData('json');
           }else{
               console.log('format tidak ditemukan')
           }
       }
    }else if(process.argv[j]=='-o'|| process.argv[j+2]=='-o'){
        if(process.argv[j+1]== null ){
            console.log('direktori tujuan tidak boleh kosong')
        }else{
            //console.log('output');   
                if(process.argv[j-1]=='text'){
                bacaDataDestinasi('text',process.argv[j+1]);
                }else if(process.argv[j-1]=='json'){
                bacaDataDestinasi('json',process.argv[j+1]);
            }else{
                bacaDataDestinasi('text',process.argv[j+1]);
            }
        }
        
    }else if (process.argv[j]=='-h'){
        showHelp();
    }
}
//console.log('inputan final = '+process.argv[2])

//process.chdir(process.argv[2]);
//console.log(process.cwd());


 
function bacaData(format){
    //console.log('method='+format)
  
    fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('sukses baca file');
    if(format=="json"){
        convertToJson(data,'');
    }else if(format=="text"){
        convertToText(data,'')
    }
    })
}
 
function bacaDataDestinasi(format, tujuan){
    //console.log('method='+format)
  
    fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('sukses baca file');
    if(format=="json"){
        convertToJson(data,tujuan);
    }else if(format=="text"){
        convertToText(data,tujuan)
    }
    })
}


function model(timestamp, type, id) {
    this.timestamp = timestamp;
    this.type = type;
    this.id = id;
}

function convertToJson(param,tujuan){            
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
    const waktuCetak = `${hours}${minutes}${seconds}`;
    //console.log('timestamp='+waktuCetak);
            var array = param.split("\n");
            var currentObj = "";
            var newArray = [];
            for(var i=0;i<array.length;i++)
            {      
                const isi = array[i].split(' ');    
                var timeStamp = isi[0]+" "+isi[1];
                var type = isi[2];
                var id = isi[3].toString().replace(':', '');
                var jean1 = new model(timeStamp, type, id);
                newArray.push(jean1);        
            }
            
            var json = JSON.stringify(newArray);
            console.log(json);

            const fs = require('fs');
            if(tujuan==''){
            fs.writeFile("files\\ConvertResult_'"+waktuCetak+"'.json", json, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("File tersimpan!");
            }); 
        }else{
            fs.writeFile(tujuan+"\\ConvertResult_'"+waktuCetak+"'.json", json, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("File tersimpan!");
            });    
            
    }

 }
function convertToText(param,tujuan){
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
    const waktuCetak = `${hours}${minutes}${seconds}`;
    //console.log('timestamp='+waktuCetak);
    var array = param.split("\n");
    var currentObj = "";
    var newArray = [];
    for(var i=0;i<array.length;i++)
    {      
        const isi = array[i].split(' ');    
        var timeStamp = isi[0]+" "+isi[1];
        var type = isi[2];
        var id = isi[3].toString().replace(':', '');
        var jean1 = new model(timeStamp, type, id);
        newArray.push(jean1);        
    }
    
    var json = JSON.stringify(newArray);
    console.log(json);

    const fs = require('fs');
    if(tujuan==''){
        fs.writeFile("files\\ConvertResult_'"+waktuCetak+"'.txt", json, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File Berhasil Disimpan!");
        }); 
    }else{
        fs.writeFile(tujuan+"\\ConvertResult_'"+waktuCetak+"'.txt", json, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File Berhasil Disimpan!");
        }); 
    }
}
function showHelp(){
    console.log("=================================================================================================================================================================================================================")
    console.log("Cara Menggunakan Command");
    console.log("-t \t Command ini untuk tipe konversi file, terdapat 2 jenis tipe konversi yaitu json dan text. Secara default akan mengkonversi sebagai text.  penggunaan: -t json\n atau -t text, hasil file akan dikeluarkan pada direktori yang sama dengan direktori project");
    console.log("-o \t Command ini untuk menyimpan file hasil konversi berdasarkan path yang diisi.  penggunaan: $ mytools /var/log/nginx/error.log -o path tujuan atau $ mytools /var/log/nginx/error.log -t json -o path tujuan");
    console.log("=================================================================================================================================================================================================================")
}
 
