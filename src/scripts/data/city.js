import { marker, layerGroup, icon } from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import customMarker from "../../public/images/marker-icon.png";

const defaultIcon = icon({
  iconUrl: customMarker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const medan = marker([3.5952, 98.6722], { icon: defaultIcon }).bindPopup(
  "Medan, Sumatera Utara"
);
const padang = marker([-0.9471, 100.4172], { icon: defaultIcon }).bindPopup(
  "Padang, Sumatera Barat"
);
const pekanbaru = marker([0.5333, 101.45], { icon: defaultIcon }).bindPopup(
  "Pekanbaru, Riau"
);
const jambi = marker([-1.61, 103.615], { icon: defaultIcon }).bindPopup(
  "Jambi, Jambi"
);
const palembang = marker([-2.9909, 104.7566], { icon: defaultIcon }).bindPopup(
  "Palembang, Sumatera Selatan"
);
const bandarLampung = marker([-5.4294, 105.261], {
  icon: defaultIcon,
}).bindPopup("Bandar Lampung, Lampung");
const jakarta = marker([-6.2088, 106.8456], { icon: defaultIcon }).bindPopup(
  "Jakarta, DKI Jakarta"
);
const bandung = marker([-6.9175, 107.6191], { icon: defaultIcon }).bindPopup(
  "Bandung, Jawa Barat"
);
const semarang = marker([-6.9667, 110.4167], { icon: defaultIcon }).bindPopup(
  "Semarang, Jawa Tengah"
);
const yogyakarta = marker([-7.8014, 110.3647], { icon: defaultIcon }).bindPopup(
  "Yogyakarta, DI Yogyakarta"
);
const surabaya = marker([-7.2575, 112.7521], { icon: defaultIcon }).bindPopup(
  "Surabaya, Jawa Timur"
);
const denpasar = marker([-8.65, 115.2167], { icon: defaultIcon }).bindPopup(
  "Denpasar, Bali"
);
const mataram = marker([-8.5833, 116.1167], { icon: defaultIcon }).bindPopup(
  "Mataram, Nusa Tenggara Barat"
);
const kupang = marker([-10.162, 123.597], { icon: defaultIcon }).bindPopup(
  "Kupang, Nusa Tenggara Timur"
);
const pontianak = marker([-0.0263, 109.3425], { icon: defaultIcon }).bindPopup(
  "Pontianak, Kalimantan Barat"
);
const banjarmasin = marker([-3.3194, 114.5908], {
  icon: defaultIcon,
}).bindPopup("Banjarmasin, Kalimantan Selatan");
const samarinda = marker([0.5, 117.15], { icon: defaultIcon }).bindPopup(
  "Samarinda, Kalimantan Timur"
);
const palangkaraya = marker([-2.2096, 113.9145], {
  icon: defaultIcon,
}).bindPopup("Palangkaraya, Kalimantan Tengah");
const gorontalo = marker([0.5414, 123.0594], { icon: defaultIcon }).bindPopup(
  "Gorontalo, Gorontalo"
);
const manado = marker([1.4748, 124.8421], { icon: defaultIcon }).bindPopup(
  "Manado, Sulawesi Utara"
);
const makassar = marker([-5.1477, 119.4327], { icon: defaultIcon }).bindPopup(
  "Makassar, Sulawesi Selatan"
);
const kendari = marker([-3.9765, 122.5155], { icon: defaultIcon }).bindPopup(
  "Kendari, Sulawesi Tenggara"
);
const palu = marker([-0.8917, 119.8707], { icon: defaultIcon }).bindPopup(
  "Palu, Sulawesi Tengah"
);
const ambon = marker([-3.695, 128.1814], { icon: defaultIcon }).bindPopup(
  "Ambon, Maluku"
);
const ternate = marker([0.7904, 127.384], { icon: defaultIcon }).bindPopup(
  "Ternate, Maluku Utara"
);
const jayapura = marker([-2.5337, 140.7181], { icon: defaultIcon }).bindPopup(
  "Jayapura, Papua"
);
const manokwari = marker([-0.8615, 134.062], { icon: defaultIcon }).bindPopup(
  "Manokwari, Papua Barat"
);

export const city = layerGroup([
  medan,
  padang,
  pekanbaru,
  jambi,
  palembang,
  bandarLampung,
  jakarta,
  bandung,
  semarang,
  yogyakarta,
  surabaya,
  denpasar,
  mataram,
  kupang,
  pontianak,
  banjarmasin,
  samarinda,
  palangkaraya,
  gorontalo,
  manado,
  makassar,
  kendari,
  palu,
  ambon,
  ternate,
  jayapura,
  manokwari,
]);
