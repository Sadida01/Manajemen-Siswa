"""
=====================================================
 APLIKASI MANAJEMEN SISWA (CRUD) - BERBASIS PYTHON
=====================================================
Aplikasi CLI (Command Line Interface) untuk mengelola
data siswa: Create, Read, Update, Delete.
Data disimpan otomatis ke file 'data_siswa.json' agar
tidak hilang saat program ditutup.

Cara menjalankan:
    python manajemen_siswa.py
=====================================================
"""

import json
import os
import csv

FILE_DATA = "data_siswa.json"


# ---------------------------------------------------
# FUNGSI PENYIMPANAN DATA
# ---------------------------------------------------
def muat_data():
    """Membaca data siswa dari file JSON (jika ada)."""
    if os.path.exists(FILE_DATA):
        with open(FILE_DATA, "r", encoding="utf-8") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []


def simpan_data(data):
    """Menyimpan data siswa ke file JSON."""
    with open(FILE_DATA, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


# ---------------------------------------------------
# FUNGSI EKSPOR REKAPITULASI
# ---------------------------------------------------
def ekspor_rekap_csv(rekap, total_siswa):
    filename = "rekap_siswa_per_kelas.csv"
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Kelas/Jurusan", "Jumlah Siswa"])
        for kelas, jumlah in rekap.items():
            writer.writerow([kelas, jumlah])
        writer.writerow([])
        writer.writerow(["Total Keseluruhan", total_siswa])
    print(f"✅ Rekapitulasi berhasil diekspor ke file '{filename}'")


def ekspor_rekap_txt(rekap, total_siswa):
    filename = "rekap_siswa_per_kelas.txt"
    with open(filename, "w", encoding="utf-8") as f:
        f.write("=========================================\n")
        f.write(" REKAPITULASI JUMLAH SISWA PER KELAS\n")
        f.write("=========================================\n\n")
        f.write(f"{'Kelas/Jurusan':<25}{'Jumlah Siswa':<15}\n")
        f.write("-" * 40 + "\n")
        for kelas, jumlah in rekap.items():
            f.write(f"{kelas:<25}{jumlah:<15}\n")
        f.write("-" * 40 + "\n")
        f.write(f"Total Keseluruhan : {total_siswa} siswa\n")
    print(f"✅ Rekapitulasi berhasil diekspor ke file '{filename}'")


# ---------------------------------------------------
# FUNGSI CRUD & FITUR TAMBAHAN
# ---------------------------------------------------
def tambah_siswa(data):
    print("\n--- TAMBAH DATA SISWA ---")
    nis = input("NIS            : ").strip()

    if any(s["nis"] == nis for s in data):
        print(f"❌ NIS '{nis}' sudah terdaftar!")
        return

    nama = input("Nama Lengkap   : ").strip()
    kelas = input("Kelas/Jurusan  : ").strip()
    jk = input("Jenis Kelamin (L/P): ").strip().upper()
    alamat = input("Alamat         : ").strip()

    siswa_baru = {
        "nis": nis,
        "nama": nama,
        "kelas": kelas,
        "jenis_kelamin": jk,
        "alamat": alamat,
    }
    data.append(siswa_baru)
    simpan_data(data)
    print("✅ Data siswa berhasil ditambahkan!")


def lihat_semua_siswa(data):
    print("\n--- DAFTAR SEMUA SISWA ---")
    if not data:
        print("(Belum ada data siswa)")
        return

    print(f"{'NIS':<10}{'Nama':<20}{'Kelas':<15}{'JK':<5}{'Alamat':<25}")
    print("-" * 75)
    for s in data:
        print(f"{s['nis']:<10}{s['nama']:<20}{s['kelas']:<15}"
              f"{s['jenis_kelamin']:<5}{s['alamat']:<25}")


def cari_siswa(data):
    print("\n--- CARI SISWA ---")
    kata_kunci = input("Masukkan NIS atau Nama siswa: ").strip().lower()
    hasil = [
        s for s in data
        if kata_kunci in s["nis"].lower() or kata_kunci in s["nama"].lower()
    ]

    if not hasil:
        print("❌ Data siswa tidak ditemukan.")
        return

    print(f"\nDitemukan {len(hasil)} data:")
    for s in hasil:
        print(f"- NIS: {s['nis']} | Nama: {s['nama']} | Kelas: {s['kelas']} "
              f"| JK: {s['jenis_kelamin']} | Alamat: {s['alamat']}")


def edit_siswa(data):
    print("\n--- EDIT DATA SISWA ---")
    nis = input("Masukkan NIS siswa yang akan diedit: ").strip()

    for s in data:
        if s["nis"] == nis:
            print("Kosongkan input jika tidak ingin mengubah data tsb.")
            nama_baru = input(f"Nama baru [{s['nama']}]: ").strip()
            kelas_baru = input(f"Kelas baru [{s['kelas']}]: ").strip()
            jk_baru = input(f"Jenis Kelamin baru [{s['jenis_kelamin']}]: ").strip().upper()
            alamat_baru = input(f"Alamat baru [{s['alamat']}]: ").strip()

            if nama_baru:
                s["nama"] = nama_baru
            if kelas_baru:
                s["kelas"] = kelas_baru
            if jk_baru:
                s["jenis_kelamin"] = jk_baru
            if alamat_baru:
                s["alamat"] = alamat_baru

            simpan_data(data)
            print("✅ Data siswa berhasil diperbarui!")
            return

    print(f"❌ Siswa dengan NIS '{nis}' tidak ditemukan.")


def hapus_siswa(data):
    print("\n--- HAPUS DATA SISWA ---")
    nis = input("Masukkan NIS siswa yang akan dihapus: ").strip()

    for s in data:
        if s["nis"] == nis:
            konfirmasi = input(
                f"Yakin hapus data '{s['nama']}'? (y/n): "
            ).strip().lower()
            if konfirmasi == "y":
                data.remove(s)
                simpan_data(data)
                print("✅ Data siswa berhasil dihapus!")
            else:
                print("Dibatalkan.")
            return

    print(f"❌ Siswa dengan NIS '{nis}' tidak ditemukan.")


def hitung_siswa_per_kelas(data):
    print("\n--- HITUNG JUMLAH SISWA BERDASARKAN KELAS/JURUSAN ---")
    if not data:
        print("(Belum ada data siswa)")
        return

    print("1. Cari spesifik berdasarkan nama Kelas/Jurusan")
    print("2. Tampilkan rekapitulasi semua Kelas/Jurusan")
    pilihan = input("Pilih mode (1/2): ").strip()

    if pilihan == "1":
        target = input("Masukkan nama Kelas/Jurusan: ").strip().lower()
        hasil = [s for s in data if target == s["kelas"].lower()]
        
        print(f"\n📊 Total siswa di kelas/jurusan '{target.upper()}': {len(hasil)} orang")
        if hasil:
            print("-" * 50)
            for i, s in enumerate(hasil, 1):
                print(f"{i}. {s['nis']} - {s['nama']} ({s['jenis_kelamin']})")

    elif pilihan == "2":
        rekap = {}
        for s in data:
            k = s["kelas"]
            rekap[k] = rekap.get(k, 0) + 1

        print("\n📊 Rekapitulasi Jumlah Siswa Per Kelas/Jurusan:")
        print(f"{'Kelas/Jurusan':<20}{'Jumlah Siswa':<15}")
        print("-" * 35)
        for kelas, jumlah in rekap.items():
            print(f"{kelas:<20}{jumlah:<15}")
        print("-" * 35)
        print(f"Total Keseluruhan : {len(data)} siswa\n")

        # Opsi Ekspor
        ekspor = input("Apakah ingin mengekspor rekapitulasi ini? (y/n): ").strip().lower()
        if ekspor == "y":
            print("Pilih Format Ekspor:")
            print("1. File CSV (.csv)")
            print("2. File Text (.txt)")
            fmt = input("Pilih format (1/2): ").strip()
            if fmt == "1":
                ekspor_rekap_csv(rekap, len(data))
            elif fmt == "2":
                ekspor_rekap_txt(rekap, len(data))
            else:
                print("❌ Format tidak valid. Ekspor dibatalkan.")

    else:
        print("❌ Pilihan tidak valid.")


# ---------------------------------------------------
# MENU UTAMA
# ---------------------------------------------------
def tampilkan_menu():
    print("\n" + "=" * 45)
    print("     APLIKASI MANAJEMEN SISWA (CRUD)")
    print("=" * 45)
    print("1. Tambah Data Siswa")
    print("2. Lihat Semua Data Siswa")
    print("3. Cari Data Siswa")
    print("4. Edit Data Siswa")
    print("5. Hapus Data Siswa")
    print("6. Hitung Siswa per Kelas/Jurusan")
    print("0. Keluar")
    print("=" * 45)


def main():
    data = muat_data()

    while True:
        tampilkan_menu()
        pilihan = input("Pilih menu (0-6): ").strip()

        if pilihan == "1":
            tambah_siswa(data)
        elif pilihan == "2":
            lihat_semua_siswa(data)
        elif pilihan == "3":
            cari_siswa(data)
        elif pilihan == "4":
            edit_siswa(data)
        elif pilihan == "5":
            hapus_siswa(data)
        elif pilihan == "6":
            hitung_siswa_per_kelas(data)
        elif pilihan == "0":
            print("Terima kasih, sampai jumpa! 👋")
            break
        else:
            print("❌ Pilihan tidak valid, silakan coba lagi.")


if __name__ == "__main__":
    main()
