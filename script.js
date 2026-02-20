(function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');

  var sellerInfo = document.getElementById('sellerInfo');
  var sellerFallback = document.getElementById('sellerFallback');

  function showFallback() {
    sellerFallback.classList.remove('hidden');
  }

  function showSeller(seller) {
    document.getElementById('sellerName').textContent = seller.name;

    var phoneEl = document.getElementById('sellerPhone');
    phoneEl.textContent = seller.phone;
    phoneEl.href = 'tel:' + seller.phone.replace(/\s/g, '');

    var emailEl = document.getElementById('sellerEmail');
    emailEl.textContent = seller.email;
    emailEl.href = 'mailto:' + seller.email;

    sellerInfo.classList.remove('hidden');

    new QRCode(document.getElementById('qrcode'), {
      text: window.location.href,
      width: 120,
      height: 120,
      colorDark: '#0F172A',
      colorLight: '#FFFFFF',
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  if (!id) {
    showFallback();
    return;
  }

  fetch('sellers.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load sellers');
      return res.json();
    })
    .then(function (sellers) {
      var seller = sellers[id.toLowerCase()];
      if (seller) {
        showSeller(seller);
      } else {
        showFallback();
      }
    })
    .catch(function () {
      showFallback();
    });
})();
