const fs = require("fs");
const { pipeline } = require("stream");
const { promisify } = require("util");
const geolib = require("geolib");
const fetch = require("node-fetch");
const Alert = require("../models/Alert");
const User = require("../models/User");
const Zone = require("../models/Zone");
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://servizio-bar.firebaseio.com",
});

const origin = [
  {
    url:
      "https://world-georss.waze.com/rtserver/web/TGeoRSS?tk=ccp_partner&format=JSON&types=traffic,alerts,irregularities&polygon=7.279000,43.696000;5.981000,45.886000;12.331000,47.290000;13.803000,46.510000;14.012000,45.618000;12.452000,44.532000;14.669000,42.597000;12.341000,41.282000;9.419000,43.601000;7.279000,43.696000",
    path: "./nord.json",
  },
  {
    url:
      "https://world-georss.waze.com/rtserver/web/TGeoRSS?tk=ccp_partner&format=JSON&types=traffic,alerts,irregularities&polygon=12.552000,41.428000;14.504000,42.536000;16.207000,41.930000;18.855000,40.094000;14.966000,36.500000;11.637000,37.926000;15.900000,39.282000;12.552000,41.428000",
    path: "./sud.json",
  },
];

const changeLatLngToLatitudeLongitude = ({ lat, lng }) => ({
  latitude: lat,
  longitude: lng,
});

const fetchFile = async (url, path) => {
  const streamPipeline = promisify(pipeline);
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Errore durante la fetch del file: ${response.statusText}`);

  await streamPipeline(response.body, fs.createWriteStream(path));
};

const saveAlerts = async (path) => {
  const readFilePromised = promisify(fs.readFile);
  const { alerts } = JSON.parse(await readFilePromised(path, "utf8"));

  const allpromises = alerts.map(async (alert) => {
    if (alert.type === "ACCIDENT") {
      const filter = { uuid: alert.uuid };
      const update = {
        ...alert,
        location: { lat: alert.location.y, lng: alert.location.x },
      };

      await Alert.findOneAndUpdate(filter, update, { upsert: true });
    }
  });
  await Promise.all(allpromises);
};

async function loadAlerts() {
  const promises = origin.map(async ({ url, path }) => {
    await fetchFile(url, path);
    await saveAlerts(path);
    fs.unlinkSync(path);
  });

  const $lt = new Date();
  const interval = process.env.INTERVAL; // Minutes
  $lt.setTime($lt.getTime() - interval * 60 * 1000);

  await Promise.all(promises);
  const alerts = await Alert.find({
    $expr: { $eq: ["$updatedAt", "$createdAt"] },
  });
  await Alert.deleteMany({ updatedAt: { $lt } });

  async function sendnotifiche() {
    const zones = await Zone.find({}).lean();

    const alertsForZone = zones.reduce((acc, currentZone) => {
      const locations = currentZone.location.map(changeLatLngToLatitudeLongitude);

      const inalerts = alerts.filter((a) =>
        geolib.isPointInPolygon(
          changeLatLngToLatitudeLongitude(a.location),
          locations
        )
      );

      return inalerts.length > 0
        ? { ...acc, [currentZone._id]: inalerts }
        : acc;
    }, {});

    const notificationPromises = Object.entries(alertsForZone).map(async ([id, zone]) => {
      const users = await User.find({ zones: id }).lean().select("msgid");
      const tokens = users.map(({ msgid }) => {
        if (msgid !== undefined) return msgid;
        else return '';
      }).flat().filter(token => token !== '');

      zone.forEach(() => {
        const message = {
          data: {
            title: "Nuovo incidente",
            body: "AccidentBot",
          },
          tokens,
        };
        admin
          .messaging()
          .sendMulticast(message)
          .then((response) => {
            if (response.failureCount > 0) {
              const failedTokens = [];
              response.responses.forEach((resp, idx) => {
                if (!resp.success) failedTokens.push(tokens[idx]);
              });
              console.log("List of tokens that caused failures: " + failedTokens);
            }
          });
      });
    });
  
    await Promise.all(notificationPromises);
  }

  if (alerts.length > 0) sendnotifiche();
  else console.log("Non ci sono novità");
}

module.exports = loadAlerts;
