const { fstat } = require('fs');
const http = require('http');
let url = require("url");
let fs = require("fs");

function getDaysDiff(d, m, y) {
    /* 
     * 
     * @param {day} d 
     * @param {month} m 
     * @param {year} y 
     * @returns week number since August 3,2020; returns -1 if the input is before 3rd of August 2020
     */

    let returnValue = -1;
    let currentDay = new Date();
    currentDay.setDate(parseInt(d));
    currentDay.setMonth(parseInt(m) - 1); // months start from 0
    currentDay.setYear(parseInt(y));
    let firstDay = new Date("8/3/2020"); // first day in semester 2

    if (currentDay >= firstDay) {
        var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
        returnValue = (Math.floor(diffDays / 7) + 1);
    }
    return (returnValue);
}

http.createServer( function(req, res) {

    let pathname = url.parse(req.url).pathname;
    let params = url.parse(req.url, true).query;
    let fileName = "";

    if (req.url !== "/favicon.ico") {

        

        if (pathname == "/") {
            fileName = "./views/index.html";
        }

        else if (pathname == "/assessments") {
            fileName = "./views/assessment.html";
        }

        else if (pathname == "/topics") {
            fileName = "./views/topic.html";
        }

        else if (pathname = "/whichweek") {
            let d = params.d;
            let m = params.m;
            let y = params.y;
            let weekOutput = getDaysDiff(d,m,y);
            let stringOutput = "";

            if (weekOutput == -1) {
                stringOutput = "Wrong Date!!! First day in Sem 2 is the 3rd of August 2020";
            }

            else if (weekOutput > 14) {
                stringOutput = "Wrong Date!!! Last day in Sem 2 is the 6th of November 2020";
            }

            else {
                stringOutput = "We are in week " + weekOutput;
            }

            return res.end(stringOutput);
        }

        
        else {
            fileName = "./views/404.html";
        }

        
        fs.readFile(fileName, function (err, data) {
            res.write(data);
            res.end();
        });

    }


}).listen(8080);

console.log("We are listening on http://localhost:8080");