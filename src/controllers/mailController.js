const nodemailer = require("nodemailer");

module.exports.sendMail = async (req, res, next) => {
  const data = req.body;
  if (!data.subject && !data.from && !data.name)
    return res.status(400).send({
      success: false,
      data: "kindly send Subject and From Email and From Name",
    });

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const datas = data.data;

  let tableContent = "";
  for (const [key, value] of Object.entries(datas)) {
    var tableData = `<tr align="left"> <th>${key.toUpperCase()}:</th> <th>${value.toUpperCase()}</th> </tr>`;
    tableContent += tableData;
  }
  const tableone = `<head>
  <style>
      table, th, td {
      border: 1px solid black;
      }
  </style>
</head><table>${tableContent}</table>`;

  // send mail with defined transport object
  await transporter.sendMail({
    from: `"${data.name}" <${data.from}>`, // sender address
    to: "109taha@gmail.com", // list of receivers
    subject: data.subject, // Subject line
    html: tableone, // html body
  });

  await transporter.sendMail({
    from: `"AlKareem-City"`, // sender address
    to: data.from, // list of receivers
    subject: "Query Received", // Subject line
    html: "Your query has been received AlKareem-City team will respond within 12 to 24 hours", // html body
  });

  //   console.log(info);

  return res.status(200).send({
    success: true,
    data: "Message send successfully",
  });
};
