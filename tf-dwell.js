const id = "ZyNMZ79h";
const url = "https://testflight.apple.com/join/" + id;
const key = "tf-" + id;

$httpClient.get({
  url: url,
  headers: {
    "Accept-Language": "en-us",
    "User-Agent": "Mozilla/5.0"
  }
}, function (error, response, data) {
  if (error || !data) {
    console.log("请求失败");
    $done();
    return;
  }
  let status = "open";
  if (data.indexOf("This beta is full.") >= 0) status = "full";
  else if (data.indexOf("isn't accepting") >= 0) status = "closed";

  console.log("Dwell: " + status);
  const prev = $persistentStore.read(key);
  if (status === "open" && prev !== "open") {
    $notification.post("Dwell 有名额", "", "点这里加入 TestFlight", { url: url });
  }
  $persistentStore.write(status, key);
  $done();
});
