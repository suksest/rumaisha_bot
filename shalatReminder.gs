function getJadwalSholat() {
   var tanggal = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd");
   var kodeKota = '697'; // Kota Bandung
   var responseSholat = UrlFetchApp.fetch("http://api.fathimah.xyz/sholat/format/json/jadwal/kota/"+kodeKota+"/tanggal/"+tanggal);
   var sholat = JSON.parse(responseSholat);
  var responseKota = UrlFetchApp.fetch("https://api.fathimah.xyz/sholat/format/json/kota/kode/"+kodeKota);
  var kota = JSON.parse(responseKota);
      
   // ambil script properties
   var properti = PropertiesService.getScriptProperties();
      
   // ambil nilai-nilai jadwal sholat
   var jadwal = {}; 
   jadwal['ashar']   = sholat.jadwal.data.ashar;
   jadwal['dhuha']   = sholat.jadwal.data.dhuha;
   jadwal['dzuhur']  = sholat.jadwal.data.dzuhur;
   jadwal['imsak']   = sholat.jadwal.data.imsak;
   jadwal['isya']    = sholat.jadwal.data.isya;
   jadwal['maghrib'] = sholat.jadwal.data.maghrib;
   jadwal['subuh']   = sholat.jadwal.data.subuh;
   jadwal['tanggal'] = sholat.jadwal.data.tanggal;
    // jadwal['terbit']  = sholat.jadwal.data.terbit;
  
  // ambil nilai kota
  var kota = kota.kota[0].nama;
      
   //masukkan data ke properti script  
   for (var key in jadwal) {
     if( jadwal.hasOwnProperty(key) ) {
       namaKey = key;
       valueKey = jadwal[key];
       properti.setProperty(namaKey, valueKey);
     } 
   }
   properti.setProperty("kota", kota);
  // Logger.log(jadwal);
 }

function showReminder() {
  var properti = PropertiesService.getScriptProperties().getProperties();
  var waktuSkrg = Utilities.formatDate(new Date(), "Asia/Jakarta", "HH:mm");
//  var waktuReminder = Utilities.formatDate(new Date(), "Asia/Jakarta", "HH:mm");
    
  var token = ""; // Isikan Bot Token dari @botFather
  var chatid = ''; // Isikan ID GRUP Telegram
    
  var tg = new telegram.daftar(token);  
  
  for (var waktuTipe in properti) {
    if (properti[waktuTipe] == waktuSkrg) {
      var pesan = '🕰 Sekarang waktunya *' + waktuTipe.toUpperCase() + '* hari `'+ properti['tanggal'] +'` pukul `' + waktuSkrg + '` WIB, untuk *' + properti['kota']+ '* _dan sekitarnya..._' ;
      tg.kirimPesan(chatid, pesan, 'markdown');
    }
  }
 }

function getRandomAyat(){
  var responseAyat = UrlFetchApp.fetch("https://api.fathimah.xyz/quran/format/json/acak");
  var ayat = JSON.parse(responseAyat);
  var properti = PropertiesService.getScriptProperties();
  properti.setProperty("no_surat", ayat.surat.nomor);
  properti.setProperty("nama_surat", ayat.surat.nama);
  properti.setProperty("no_ayat", ayat.acak.id.ayat);
  properti.setProperty("teks_ar", ayat.acak.ar.teks);
  properti.setProperty("teks_id", ayat.acak.id.teks);
}

function sendAyat(){
  var properti = PropertiesService.getScriptProperties().getProperties();
  var token = ""; // Isikan Bot Token dari @botFather
  var chatid = ''; // Isikan ID GRUP Telegram
    
  var tg = new telegram.daftar(token);
  var pesan = 'Q.S. ' + properti['nama_surat'] + ' ayat ' + properti['no_ayat'] + '\n\n' + properti['teks_ar'] + '\n' + 'Artinya: \n' + properti['teks_id'];
  tg.kirimPesan(chatid, pesan, 'markdown');
}
