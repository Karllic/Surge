const WIFI_DONT_NEED_PROXYS = ['Santiano_5G' , 'PDCN', 'PDCN_5G', 'ROSI', '602', '56', 'Cullen_5G'];
const CURRENT_WIFI_SSID_KEY = 'current_wifi_ssid';

if (wifiChanged()) {
  const mode = WIFI_DONT_NEED_PROXYS.includes($network.wifi.ssid)
    ? 'direct'
    : 'rule';
  $surge.setOutboundMode(mode);
   const Mode = WIFI_DONT_NEED_PROXYS.includes($network.wifi.ssid)
    ? '直接连接'
    : '规则判定';
  $notification.post(
    '网络已改变',
    `${$network.wifi.ssid || '蜂窝网络'}`,
    `出站模式已修改为 ${Mode} `
  );
}

function wifiChanged() {
  const currentWifiSSid = $persistentStore.read(CURRENT_WIFI_SSID_KEY);
  const changed = currentWifiSSid !== $network.wifi.ssid;
  changed && $persistentStore.write($network.wifi.ssid, CURRENT_WIFI_SSID_KEY);
  return changed;
}

$done();
