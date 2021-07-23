
const https = require("https");
const url = require("url");
const line_api_url = "https://api.line.me/v2/bot/message/broadcast";
const line_token = process.env.CHANNEL_ACCESS_TOKEN;

exports.handler = function (e, ctx, cb) {

  var line = url.parse(line_api_url);

  line.method = "POST";
  line.headers = {
  	"Content-Type": "application/json",
  	"Authorization": "Bearer {" + line_token + "}"
  };
  var payload = {
    messages: [
      {
			"type":"text",
			"text":"郵便ポストに何か届いたよ！😁"
      }
    ],
  };
  var body = JSON.stringify(payload);
  line.headers["Content-Length"] = Buffer.byteLength(body);

    var req = https.request(line, function (res) {
    if (res.statusCode === 200) {
      cb(null, { result: "ok" });
    } else {
      cb(false, { result: "ng", reason: "Failed to post line" + res.statusCode });
    }
    return res;
  });

  req.write(body);
  req.end();
};
