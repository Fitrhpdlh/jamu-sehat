
const form = document.getElementById("orderForm");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const telepon = document.getElementById("telepon").value.trim();
        const pilihanMenu = document.getElementById("menu");
        const jumlah = Number(document.getElementById("jumlah").value);
        const catatan = document.getElementById("catatan").value.trim();

        const opsi = pilihanMenu.options[pilihanMenu.selectedIndex];
        const namaMenu = pilihanMenu.value;
        const harga = Number(opsi.dataset.harga);

        if (!nama || !telepon || !namaMenu ||
            !Number.isInteger(jumlah) || jumlah < 1 || jumlah > 100) {
            alert("Periksa kembali data pemesanan kamu.");
            return;
        }

        const total = harga * jumlah;

        const formatRupiah = function (angka) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0
            }).format(angka);
        };

        const hasil = document.getElementById("hasilPesanan");
        hasil.replaceChildren();

        const judul = document.createElement("h3");
        judul.textContent = "Ringkasan Pesanan";
        hasil.appendChild(judul);

        const data = [
            ["Nama pelanggan", nama],
            ["Nomor telepon", telepon],
            ["Menu", namaMenu],
            ["Harga satuan", formatRupiah(harga)],
            ["Jumlah", String(jumlah)],
            ["Total harga", formatRupiah(total)],
            ["Catatan", catatan || "-"]
        ];

        const daftar = document.createElement("ul");

        data.forEach(function (item) {
            const baris = document.createElement("li");
            const label = document.createElement("strong");

            label.textContent = item[0] + ": ";
            baris.appendChild(label);
            baris.appendChild(document.createTextNode(item[1]));
            daftar.appendChild(baris);
        });

        hasil.appendChild(daftar);

        const keterangan = document.createElement("p");
        keterangan.textContent =
            "Ringkasan berhasil dibuat di browser. " +
            "Pesanan ini belum dikirim atau disimpan.";
        hasil.appendChild(keterangan);

        hasil.hidden = false;
        hasil.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
}