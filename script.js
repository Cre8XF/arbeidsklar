(function () {
  var params = new URLSearchParams(window.location.search);
  var id = (params.get('id') || '').toLowerCase().trim();

  var sellerInfo = document.getElementById('sellerInfo');
  var sellerFallback = document.getElementById('sellerFallback');

  function showFallback() {
    sellerFallback.style.display = 'block';
  }

  function showSeller(seller) {
    document.getElementById('sellerName').textContent = seller.name;

    var rawPhone = seller.phone;
    var telPhone = rawPhone.replace(/\s/g, '');

    var phoneSpan = document.getElementById('sellerPhone');
    phoneSpan.textContent = rawPhone;

    var phoneLink = document.getElementById('sellerPhoneLink');
    phoneLink.href = 'tel:' + telPhone;

    var emailSpan = document.getElementById('sellerEmail');
    emailSpan.textContent = seller.email;

    var emailLink = document.getElementById('sellerEmailLink');
    emailLink.href = 'mailto:' + seller.email;

    sellerInfo.style.display = 'block';

    // Generate QR code pointing to current URL (includes ?id=)
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
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(function (sellers) {
      var seller = sellers[id];
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
