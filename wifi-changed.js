const WIFI_DONT_NEED_PROXYS = ['Santiano_5G' , 'Santiano'];
const CURRENT_WIFI_SSID_KEY = 'current_wifi_ssid';

if (wifiChanged()) {
  const mode = WIFI_DONT_NEED_PROXYS.includes($network.wifi.ssid)
    ? '直接连接'
    : '规则判定';
  $surge.setOutboundMode(mode);
  $notification.post(
    '网络已改变',
    `${$network.wifi.ssid || '蜂窝网络'}`,
    `现使用 ${mode} 模式`
  );
}

function wifiChanged() {
  const currentWifiSSid = $persistentStore.read(CURRENT_WIFI_SSID_KEY);
  const changed = currentWifiSSid !== $network.wifi.ssid;
  changed && $persistentStore.write($network.wifi.ssid, CURRENT_WIFI_SSID_KEY);
  return changed;
}

$done();
