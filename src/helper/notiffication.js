const FCM = require("fcm-node");
var serverKey = process.env.SERVERKEY;
// var fcm = new FCM(serverKey);
var fcm = new FCM("ksadnasuih;");

const sendNotification = async (title, body, deviceToken, ID) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    to: deviceToken,
    data: {
      my_key: ID,
    },
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

module.exports = sendNotification;
