import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as pdf from 'html-pdf';
import * as express from 'express';


export const PdfFactory ={
    provide: "PdfFactory",
    useFactory: ()=>{
        return new PdfService();
    } 
}

@Injectable()
export class PdfService{
    exportPdf(res:express.Response,name:string){
        var html=this.setHtmlForTable(name);
        pdf.create(html).toStream((err, stream)=>{ 
          res.set('Content-Type', 'application/pdf');
          res.attachment('test.pdf');
          stream.pipe(res);
        }); 
    }

    setHtmlForTable(name:string){
        return `
            <!DOCTYPE html>
            <html>
            <head>
            <style>
            
            @font-face {
                font-family: kttf;
                src: url(file:///${process.cwd()}/public/source/font/kttf.ttf) format("truetype")                     
            }

            body{
                font-family: Mttf;                  
            }

            table {
            font-family: Mttf;              
            border-collapse: collapse;
            width: 100%;
            }

            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            }

            tr:nth-child(even) {
            background-color: #dddddd;
            }
            </style>
            </head>
            <body>

            <h2>HTML Table</h2>

            <table>
            <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
            </tr>
            <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
            </tr>
            <tr>
                <td>${name}</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
            </tr>
            <tr>
                <td>Ernst Handel</td>
                <td>Roland Mendel</td>
                <td>Austria</td>
            </tr>
            <tr>
                <td>Island Trading</td>
                <td>Helen Bennett</td>
                <td>UK</td>
            </tr>
            <tr>
                <td>Laughing Bacchus Winecellars</td>
                <td>Yoshi Tannamuri</td>
                <td>Canada</td>
            </tr>
            <tr>
                <td>Magazzini Alimentari Riuniti</td>
                <td>Giovanni Rovelli</td>
                <td>Italy</td>
            </tr>
            </table>
            <img width="300px" src="file:///${process.cwd()}/public/source/S__6266995.jpg">
            </body>
            </html>
        `
    }
    
}