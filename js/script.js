var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
var resultArea = document.querySelector(".comment");

var modal = document.getElementById("myModal");
var modalText = document.querySelector("#modalText");
var span = document.getElementsByClassName("close")[0];

function calculate() {
    if (height.value === '' || weight.value === '' || (male.checked === false && female.checked === false)) {
        showModal(" Masi ada yang belum diisi ");
    } else {
        countBmi();
    }
}
  
function countBmi() {
    var p = [height.value, weight.value];
    if (male.checked) {
        p.push("male");
    } else if (female.checked) {
        p.push("female");
    }

    var bmi = Number(p[1]) / (Number(p[0]) / 100 * Number(p[0]) / 100);

    var result = '';
    if (bmi < 18.5) {
        result = 'Kurus';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        result = 'Ideal';
    } else if (bmi >= 25 && bmi <= 29.9) {
        result = 'Gemuk';
    } else if (bmi >= 30 && bmi <= 34.9) {
        result = 'Obesitas';
    } else if (bmi >= 35) {
        result = 'Obesitas Extreme';
    }

    showResult(result, bmi.toFixed(2));
}

function showResult(result, bmiValue) {
    resultArea.style.display = "block";
    document.querySelector(".comment").innerHTML = ` Kamu Termasuk <span id="comment">${result}</span>`;
    document.querySelector("#result").innerHTML = bmiValue;
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.style.display = 'block';
        // Menampilkan penjelasan mengenai hasil BMI
        var explanationElement = document.getElementById("bmiExplanation");
        switch (result) {
            case "Kurus":
                explanationElement.textContent = "BMI Anda menunjukkan bahwa Anda berada dalam kategori kurus. Sebaiknya konsultasikan dengan ahli gizi untuk mendapatkan penanganan yang tepat.";
                break;
            case "Ideal":
                explanationElement.textContent = "BMI Anda berada dalam kategori berat badan ideal. Pertahankan pola makan dan gaya hidup sehat untuk menjaga kesehatan tubuh.";
                break;
            case "Gemuk":
                explanationElement.textContent = "BMI Anda menunjukkan bahwa Anda berada dalam kategori berat badan berlebih atau kelebihan berat badan. Pertimbangkan untuk mengatur pola makan dan melakukan aktivitas fisik secara rutin.";
                break;
            case "Obesitas":
                explanationElement.textContent = "BMI Anda menunjukkan bahwa Anda mengalami obesitas. Segera konsultasikan dengan ahli gizi atau dokter untuk penanganan lebih lanjut.";
                break;
            case "Obesitas Extreme":
                explanationElement.textContent = "BMI Anda menunjukkan bahwa Anda mengalami obesitas extreme. Segera konsultasikan dengan ahli gizi atau dokter untuk penanganan medis yang lebih lanjut.";
                break;
            default:
                explanationElement.textContent = "";
                break;
        }
}

function showModal(message) {
    modal.style.display = "block";
    modalText.innerHTML = message;
}

function downloadResult() {
    const bmiResult = document.getElementById('result').innerText;
    const filename = 'BMI_Result.txt';
    const blob = new Blob([`BMI Result: ${bmiResult}`], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Event listener untuk download button
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', downloadResult);

function resetForm() {
    height.value = "";
    weight.value = "";
    male.checked = false;
    female.checked = false;
    resultArea.style.display = "none";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}