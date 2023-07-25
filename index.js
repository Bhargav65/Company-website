const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const app = express();
app.set('view engine', 'ejs');
const process = require('process');
const port=process.env.PORT || 3000
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse URL-encoded data
const path = require('path');
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

app.post('/send',async(req,res)=>{
			const transporter = nodemailer.createTransport({
				service : 'Gmail',
				auth : {
					user : 'node52919@gmail.com',
					pass : 'sfineizxklxruipq'
				}
			});
            const text={PhoneNo:req.body.number,
                        Email:req.body.email,
                        text:req.body.text}
			const mail_option = {
				from : req.body.email,
				to : 'bollaakanksha@gmail.com',
				subject : req.body.subject,
				text :  JSON.stringify(text)
			};

			transporter.sendMail(mail_option, (error, info) => {
				if(error)
				{
					console.log(error);
				}
				else
				{
					res.redirect('/success');
				}
			});
		});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname+'/success.html'));
});

//start server
app.listen(port, () => {

	console.log('Server started on port 3000');

});