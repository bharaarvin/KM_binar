class bangunDatar {

    panjang;
    lebar;
    tinggi;
    alas;

    constructor(panjang, lebar, tinggi, alas) {

        this.panjang = panjang;
        this.lebar = lebar;
        this.tinggi = tinggi;
        this.alas = alas;

        if (this.constructor === bangunDatar) {
            throw new Error("This Object is abstraction");
        }
    }

    luas() {
        console.log("ini luas")
    }

    keliling() {
        console.log("ini keliling")
    }
}

class persegiPanjang extends bangunDatar{

    constructor(panjang, lebar){
        super(panjang, lebar);
    }

    luas() {
        var luas, hasil;
        luas =  this.panjang * this.lebar;
        hasil = console.log("Luas Persegi panjang = " + luas);
        return hasil;
    }

    keliling() {
        var keliling, hasil;
        keliling =  2 * (this.lebar + this.panjang);
        hasil = console.log("Keliling Persegi panjang = " + keliling);
        return hasil;
    }
}

class Persegi extends bangunDatar {

    constructor(panjang) {
        super(panjang);
    }

    luas() {
        var luas, hasil;
        luas = this.panjang * this.panjang;
        hasil = console.log("Luas Persegi = " + luas);
        return hasil;
    }

    keliling() {
        var keliling, hasil;
        keliling = 4 * this.panjang;
        hasil = console.log("Keliling Persegi = " + keliling);
        return hasil;
    }
}

class Segitiga extends bangunDatar {

    constructor(panjang, lebar) {
        super(panjang, lebar);
    }

    luas() {
        var luas, hasil;
        luas = (this.panjang * this.lebar) / 2;
        hasil = console.log("Luas Segitiga = " + luas);
        return hasil;
    }

    keliling() {
        var keliling, hasil;
        keliling = 3 * this.panjang;
        hasil = console.log("Keliling Segitiga = " + keliling);
        return hasil;
    }
}

let persegiPanjang1 = new persegiPanjang(3,8);
let Persegi1 = new Persegi(5);
let Segitiga1 = new Segitiga(4,6);
persegiPanjang1.luas();
persegiPanjang1.keliling();
Persegi1.luas();
Persegi1.keliling();
Segitiga1.luas();
Segitiga1.keliling();