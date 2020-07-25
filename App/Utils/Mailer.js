import RNSmtpMailer from "react-native-smtp-mailer";
import {emailTemplate} from './MailTemplate';
import Toast from 'react-native-simple-toast';
const RNFS = require('react-native-fs');

export const Mailer = (courseName,email,name,date,topics,results,type) => {
    RNSmtpMailer.sendMail({
        mailhost: "smtp.gmail.com",
        port: "465",
        ssl: true,
        username: "tlsauth2020",
        password: "teaching2020!",
        from: "tlsauth2020@gmail.com",
        recipients: email,
        subject: type==="StudentList"?courseName+" list of Students" : courseName + " " + type + " results " +"("+date+")",
        htmlBody : emailTemplate(courseName,name,date,topics,results,type),
        attachmentPaths : type==="StudentList"?[
            RNFS.DocumentDirectoryPath + `/${courseName}.csv`
        ]:[],
        attachmentNames : type==="StudentList"?[
            `${courseName}.csv`
        ]:[],
        attachmentTypes : type==="StudentList"?[
            "csv"
        ]:[]
    })
        .then(success => {
            Toast.show('Email Sent!');
            console.log(success)
        })
        .catch(err => {
            Toast.show('Sending Failed');
            console.log(err)
        });
}
