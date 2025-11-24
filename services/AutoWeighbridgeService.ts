import dotenv from "dotenv";

dotenv.config();

const Net = require('net');
const portW = process.env.WEIGHBRIDGE_PORT;
const host = process.env.WEIGHBRIDGE_HOST;
let receivedData: string;

let flag = false;
async function GetAutoWeighbridgeData() {
    try {
        const client = new Net.Socket();
        client.connect({ port: portW, host: host }, function () {
            console.log('TCP connection established with the server.');
            flag = true;
        });
        client.on('data', function (chunk: string) {
            console.log(`Data received from the server: ${chunk.toString()}.`);
            receivedData = chunk.toString();
            client.end();
            flag = false;

        });
        client.on('error', function (error: Error) {
            console.error('An error occurred:', error);
            flag = false;
        });
        if(flag){
            return {
                status: 200,
                message: "Success",
                data: receivedData,
            };
        }
        else{
            return {
                status: 500,
                message: "Couldn't connect to the server",
                data: null,
            };
        }
    }
    catch (error) {
        return {
            status: 500,
            message: error,
            data: null,
        };
    }
}

// var SerialPort = require("serialport");
// var port = '';
// async function GetAutoWeighbridgeData() {
//     var serialPort = new SerialPort(port, {
//         baudRate: 9600
//       });
//     try {
//         serialPort.on("open", function() {
//             console.log("-- Connection opened --");
//             serialPort.on("data", function(data: string) {
//               console.log("Data received: " + data);
//               receivedData = data;
//               flag = true;
//             });
//           });
//         serialPort.on('error', function (error: Error) {
//             console.error(error);
//             flag = false;
//         });
//         if(flag){
//             return {
//                 status: 200,
//                 message: "Success",
//                 data: receivedData,
//             };
//         }
//         else{
//             return {
//                 status: 500,
//                 message: "Couldn't connect to the server",
//                 data: null,
//             };
//         }
//     }
//     catch (error) {
//         return {
//             status: 500,
//             message: error,
//             data: null,
//         };
//     }
// }

export { GetAutoWeighbridgeData };