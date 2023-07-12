const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

const pwd = (cb) => {
    cb(process.cwd()); // cb --> callback de "print"
};

const date = (print) => {
    print(Date());
};

const echo = (print, args) => {
    print(args);
};

const ls = (print) => {
    fs.readdir(".", (err, files)=>{
        if(err) throw new Error(err);
        print(files.join(" ")); 
    } );
};

const cat = (cbprint, args) => {
    fs.readFile(args, "utf-8", (err, data)=>{
        if(err) throw new Error(err);
        cbprint(data);
    });
};

const head = (cb, args) => {
    fs.readFile(args, "utf-8", (err, data)=>{
        if(err) throw new Error(err);
        const lines = data.split("\n");
        cb(lines[0].trim());
    });
};

const tail = (print, args) => {
    fs.readFile(args, "utf-8", (err, data)=>{
        if(err) throw new Error(err);
        const lines = data.split("\n");
        print(lines[lines.length - 1].trim());
    });
};

const curl = (print, args) => {
    utils.request(args, (error, response)=>{
        if(error) throw new Error(error);
        print(response);
    });
};

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl,
};
