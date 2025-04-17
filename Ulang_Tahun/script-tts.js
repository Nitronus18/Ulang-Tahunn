$(document).ready(function () {
    var jml_kotak = 15;
    var skor = 0;
    var total_skor = 0;
    var kotak_data = [];
    var jawaban = [];
    var salah = [];

    // Menetapkan grid sebagai kotak simetris
    $(".grid").css("grid-template-columns", "repeat(" + jml_kotak + ", 40px)"); // Set grid menjadi kotak dengan ukuran 40px
    $(".grid").css("grid-template-rows", "repeat(" + jml_kotak + ", 40px)");

    // Inisialisasi kotak data
    for (let i = 0; i < jml_kotak; i++) {
        kotak_data[i] = [];
        for (let j = 0; j < jml_kotak; j++) {
            kotak_data[i][j] = [false, true, false, -1, "", ""]; // format [is-filled, is-correct, is-path, path-number, correct-answer, user-answer]
            total_skor++;
        }
    }

    // Menambahkan pertanyaan dan jawaban ke grid
    $.each(quiz, function (index, value) {
        var len = value[3].length;
        var path = [];

        // Menandai kotak yang terkait dengan pertanyaan
        kotak_data[value[0]][value[1]][2] = true;
        kotak_data[value[0]][value[1]][3] = (index + 1);

        if (value[4] === "turun") {
            $("#menurun").append("<div class='question' id='q" + index + "'>" + (index + 1) + ". " + value[2] + "</div>");
        } else {
            $("#mendatar").append("<div class='question' id='q" + index + "'>" + (index + 1) + ". " + value[2] + "</div>");
        }

        // Menandai path untuk jawaban
        for (let a = 0; a < len; a++) {
            var row = value[0] + (value[4] === "turun" ? a : 0);
            var col = value[1] + (value[4] === "datar" ? a : 0);
            kotak_data[row][col][0] = true;
            kotak_data[row][col][4] = value[3].charAt(a).toUpperCase();
            path.push([row, col]);
        }

        jawaban.push(path);
    });

    // Menambahkan kotak input untuk teka-teki silang
    for (let i = 0; i < jml_kotak; i++) {
        for (let j = 0; j < jml_kotak; j++) {
            var cell = $("<span>").addClass("grid__item");
if (kotak_data[i][j][0]) {
  var input = $('<input type="text" class="for-tts" maxlength="1">')
      .attr("data-row", i)
      .attr("data-col", j);

  if (kotak_data[i][j][2]) {
      input.attr("placeholder", kotak_data[i][j][3]);
  }

  cell.append(input);
} else {
  cell.addClass("empty");
}
$(".grid").append(cell);

        }
    }

    // Menampilkan skor
    $("#skor").text(skor + "/" + total_skor);

    // Ketika input berubah, update jawaban yang dimasukkan
    $(".for-tts").on("input", function () {
        var row = $(this).data("row");
        var col = $(this).data("col");
        var val = $(this).val().toUpperCase();
        kotak_data[row][col][5] = val; // menyimpan jawaban pengguna
    });

    // Cek jawaban
    $("#btn_cek").click(function () {
        skor = 0;
        salah = [];
    
        $(".grid__item").removeClass("correct incorrect");
        $(".question").removeClass("salah").addClass("benar");
    
        $.each(quiz, function (index, value) {
            var correct = true;
            var cells = jawaban[index];
    
            $.each(cells, function (_, cell) {
                var row = cell[0];
                var col = cell[1];
                var userInput = kotak_data[row][col][5];
                var correctAnswer = kotak_data[row][col][4];
    
                // ⬇️ INI YANG DIGANTI
                let gridCell = $('.for-tts[data-row="' + row + '"][data-col="' + col + '"]').closest(".grid__item");
    
                if (userInput !== correctAnswer) {
                    correct = false;
                    gridCell.removeClass("correct").addClass("incorrect");
                } else {
                    skor++;
                    gridCell.removeClass("incorrect").addClass("correct");
                }
            });
    
            if (!correct) {
                salah.push(index);
            }
        });
    
        $("#skor").text(skor + "/" + total_skor);
    
        $.each(salah, function (_, idx) {
            $("#q" + idx).removeClass("benar").addClass("salah");
        });
    });
    
    
});
