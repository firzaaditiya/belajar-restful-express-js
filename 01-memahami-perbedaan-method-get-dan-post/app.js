/*
    HTTP Method "GET" adalah sebuah http method yang digunakan untuk menarik/menerima data dari server, method get juga bisa
    mengirim sebuah data melalui "query string", namun yang jadi masalah adalah ketika kita mengirim data melalui
    "query string" maka data yang dikirimkan pasti muncul pada URL nya dan ini kurang baik, dan method get ini memiliki
    batas jumlah data yang bisa dikirimkan. Method ini kurang cocok digunakan ketika kita ingin mengirimkan data ke server
    atau bagian "Backend"

    biasanya data yang dikirimkan menggunakan method get itu seperti "ordering, filtering, searching" atau data data yang
    sederhana saja

    ketika kita ingin mengirimkan sebuah data dan data itu akan diolah oleh backend maka akan lebih baik menggunakan method
    "POST", method ini digunakan untuk mengirimkan data ke server dan biasanya digunakan saat membuat/mengubah data

    data yang dikirim bukan melalui "query string" melainkan melalui "BODY" maka data nya tidak akan muncul pada URL, tetapi
    berada pada "PAYLOAD" atau didalam body. dan kelebihan lainnya adalah kita bisa mengirimkan data nya bisa berupa tipe
    data JSON
*/