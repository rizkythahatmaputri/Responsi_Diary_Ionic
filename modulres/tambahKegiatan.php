<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$judul = trim($data['judul']);
$nama = trim($data['nama']);
http_response_code(201);
if ($judul != '' and $nama != '') {
    $query = mysqli_query($koneksi, "insert into kegiatan(judul,nama) values('$judul','$nama')");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
