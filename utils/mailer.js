// Email configuration
import nodemailer from "nodemailer"
import { google } from "googleapis"
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "527243332009-o6hle0vd8se5jt0g17u5ohh3t3fngt7l.apps.googleusercontent.com", // ClientID
    "Ogl1bkkCsCt2Rlfc8lFjoJ6u", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//043JY2QHyet5_CgYIARAAGAQSNwF-L9Iru76tSFzN_rEzswH8ZOvEGLzUKTARw8da6deHidXeSWZC042HbspxAXmmTKzzvEeHKKI"
})
const accessToken = oauth2Client.getAccessToken()
export const sendMail = (bodyHtml, toMail, subjectMail) => {
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "ducyang98@gmail.com",
            clientId: "527243332009-o6hle0vd8se5jt0g17u5ohh3t3fngt7l.apps.googleusercontent.com",
            clientSecret: "Ogl1bkkCsCt2Rlfc8lFjoJ6u",
            refreshToken: "1//043JY2QHyet5_CgYIARAAGAQSNwF-L9Iru76tSFzN_rEzswH8ZOvEGLzUKTARw8da6deHidXeSWZC042HbspxAXmmTKzzvEeHKKI",
            accessToken: accessToken
        }
    })

    const mailOptions = {
        from: "ducyang98@gmail.com",
        to: toMail,
        generateTextFromHTML: true,
        subject: subjectMail,
        html: bodyHtml
    }
    // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
    return smtpTransport.sendMail(mailOptions)
}

