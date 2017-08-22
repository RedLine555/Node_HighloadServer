const fs = require('fs'),
    request = require('request'),
    path = require('path');

let lines = fs.readFileSync(path.resolve('tmp/answers/phase_1_get.answ'), 'utf8').split('\n');


// fs.readFile(path.resolve('tmp/answers/phase_1_get.answ'), 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// });
describe("basic api tests", function () {

    baseUrl = 'http://localhost:4000'
    for (let i = 0; i < /*lines.length*/2; i++) {
        let parsed = lines[i].split('\t');

        it(`should ${parsed[0]} to ${parsed[1]} and return ${parsed[2]} - ${parsed[3]}`, function (done) {
            request[parsed[0].toLowerCase()](baseUrl + parsed[1], (err, response, body) => {
                body = JSON.parse(JSON.stringify(body))
                expect(err).toBeNull();
                expect(response.statusCode).toBe(+parsed[2]);
                if (parsed[3]) {
                    let obj = JSON.parse(parsed[3]);
                    for (let k in obj) {
                        console.log(obj[k])
                        console.log(body[k])
                    //     expect(obj[k]).toBe(body[k]);
                    }
                    expect(obj).toEqual(body);
                }
                done();
            })
        });
    }
})