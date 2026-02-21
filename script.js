document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     HENT SELGER FRA URL
  ========================== */

  const params = new URLSearchParams(window.location.search);
  const id = (params.get("id") || "").toLowerCase().trim();

  const nameEl = document.getElementById("sellerName");
  const phoneEl = document.getElementById("sellerPhone");
  const emailEl = document.getElementById("sellerEmail");
  const sellerQR = document.getElementById("qrcode");

  if (id) {
    fetch("sellers.json")
      .then(res => {
        if (!res.ok) throw new Error("Kunne ikke laste sellers.json");
        return res.json();
      })
      .then(sellers => {
        const seller = sellers[id];

        if (seller) {
          nameEl.textContent = seller.name;
          phoneEl.textContent = seller.phone;
          emailEl.textContent = seller.email;

          // QR som peker til denne selgerens side
          if (sellerQR) {
            new QRCode(sellerQR, {
              text: window.location.href,
              width: 110,
              height: 110,
              colorDark: "#000000",
              colorLight: "#ffffff",
              correctLevel: QRCode.CorrectLevel.M
            });
          }
        }
      })
      .catch(err => {
        console.warn("Seller ikke funnet:", err);
      });
  }

  /* =========================
     QR FOR TOOLS.NO (FOOTER)
  ========================== */

  const toolsQR = document.getElementById("toolsQR");

  if (toolsQR) {
    new QRCode(toolsQR, {
      text: "https://www.tools.no",
      width: 90,
      height: 90,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  }

});