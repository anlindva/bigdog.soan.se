/* Simple preview gate — remove this file + script tag when going live */
(function() {
  var KEY = 'bigdog-preview';
  var PASS = 'bigdog2026';
  if (sessionStorage.getItem(KEY) === 'ok') return;
  var p = prompt('Den här sidan är under uppbyggnad.\nAnge lösenord för att förhandsgranska:');
  if (p === PASS) {
    sessionStorage.setItem(KEY, 'ok');
  } else {
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1A1714;color:#8A8279;font-family:sans-serif;text-align:center;padding:24px"><div><h1 style="color:#F0EBE5;margin-bottom:16px">BigDog</h1><p>Sidan är under uppbyggnad. Kom tillbaka snart!</p></div></div>';
  }
})();
