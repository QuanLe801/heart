const textConfig = {
  titleShow: "Chào bạn nhỏoo!",
  subTitleShow: "Chào mừng tới chương trình hỏi xoáy đáp xoay.. Bạn nhỏ đã sẵn sàng chưa?",
  text3: "Quét trừn 1: Bạn yêu ai nhất nhà nhỉ?",
  text4: "Cứ trả lời thật lòng nhé. Toai không buồn đâu :<",
  text5: "Jung Kook",
 
  text7: "Quét trừn 2: Nhí nho nhăng nhại nhiêu?",
  text8: "Gửi cho tớ!",
  textCancel: 'Ỏ noooo. Thoát ra là 10 ka',
  text9: "Nhì nhậu nhẹp nhai nhà nhễ nhương nhắm nhuôn <3",
  text10: "Bố mi đẹp trai sẵn rồi! Hỏi thừa quá bạn :D",
  text11:
    "Thời gian có hạn nên chỉ làm nấy thôi. Cầm lấy món quà nhỏ này rồi làm việc tiếp đê",
  text12: "Okii lunn <3",
  textATSH: "Anh trai say hi",
  textHTH: "Hiếu thứ hai",
  textQUANLA: "Quan La Manh",

};

$(document).ready(function () {
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.textATSH);
  $("#no2").html(textConfig.textHTH);
  $("#no3").html(textConfig.text5); 
  $("#yes").html(textConfig.textQUANLA);

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      imageUrl: "img/titleShowImg.webp",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
      title: textConfig.titleShow,
      text: textConfig.subTitleShow,
    }).then(function () {
      $(".content").show(200);
    });
  }

  // switch button position
  function switchButton(button) {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $(button).css("left");
    var topNO = $(button).css("top");
    var leftY = $("#yes").css("left");
    var topY = $("#yes").css("top");
    $(button).css("left", leftY);
    $(button).css("top", topY);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNO);
  }
  // move random button póition
  function moveButton(button) {
    // var audio = new Audio("sound/Swish1.mp3");
    // audio.play();
    if (screen.width <= 600) {
      var x = Math.random() * 300;
      var y = Math.random() * 500;
    } else {
      var x = Math.random() * 500;
      var y = Math.random() * 500;
    }
    var left = x + "px";
    var top = y + "px";
    $(button).css("left", left);
    $(button).css("top", top);
  }

  var n = 0;
  $(".no").mousemove(function () {
    if (n < 1) switchButton(this);
    if (n > 1) moveButton(this);
    n++;
  });
  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // generate text in input
  function textGenerate() {
    var n = "";
    var text = " " + textConfig.text9;
    var a = Array.from(text);
    var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
    var count = textVal.length;
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        n = n + a[i];
        if (i == text.length + 1) {
          $("#txtReason").val("");
          n = "";
          break;
        }
      }
    }
    $("#txtReason").val(n);
  }

  // show popup
  $("#yes").click(function () {
    var audio = new Audio("sound/tick.mp3");
    audio.play();
    Swal.fire({
      title: textConfig.text7,
      html: true,
      width: 900,
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason'  placeholder='Whyyy'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
                    rgba(0,0,123,0.4)
                    url("img/giphy2.gif")
                    left top
                    no-repeat
                  `, 
      confirmButtonColor: "#fe8a71",
      cancelButtonColor: "#f6cd61",
      showCancelButton: true,
      cancelButtonText: 'Từ chối',
      confirmButtonText: textConfig.text8,
      preConfirm: async () => {
        const reason = document.getElementById("txtReason").value;
        if (reason.trim() === '') {
          return  Swal.showValidationMessage(`
            Nhập lí do vào.. Đừng có chơi bẩn!
          `);
          }
      },
    }).then((result) => {
      // if comfirm
      if (result.isConfirmed) {
        Swal.fire({
          width: 900,
          confirmButtonText: textConfig.text12,
          background: '#fff url("img/iput-bg.jpg")',
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#83d0c9",
          imageUrl: "img/gift.webp",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          onClose: () => {
            window.location = "./heart.html";
          },
        })
      }
    })

    const cancelButton = Swal.getCancelButton();
    cancelButton.addEventListener("mousemove", () => {
      cancelButton.disabled = true; // Disable nút
      cancelButton.textContent = "Cak.. Ai cho mà thoát!"; // Đổi nội dung
    });
  

    $("#txtReason").focus(function () {
      var handleWriteText = setInterval(function () {
        textGenerate();
      }, 10);
      $("#txtReason").blur(function () {
        clearInterval(handleWriteText);
      });
    });
  });
});