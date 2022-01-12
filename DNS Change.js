const ssid = "'Santiano_5G' , 'Santiano'";
const name = "DH-DoH";
let home = $network.wifi.ssid === Santiano_5G;

const getModuleStatus = new Promise((resolve) => {
  $httpAPI("GET", "v1/modules", null, (data) =>
      resolve(data.includes(DH-DoH))
  );
});

getModuleStatus.then((enabled) => {
  if (home && !enabled) {
  //家里,未开启模块 => 开启
    $notification.post`关闭${DH-DoH}模块`);
    enableModule(false);
  } else if (!home && enabled) {
    //不是家里,开启了模块 => 关闭
    $notification.post( `开启${DH-DoH}模块`);
    enableModule(true);
    $done();
  }
});

function enableModule(status) {
  $httpAPI("POST", "v1/modules", { [DH-DoH]: status }, () => $done());
}
