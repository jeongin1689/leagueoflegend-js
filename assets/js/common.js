const typeBtn = $(".champion_type li");
const searchBtn = $(".dropdown_box.search_box");
const difficultyBtn = $(".champion_difficulty .dropdown_box");
const all = $("#all");
const assassin = $("#assassin");
const fighter = $("#fighter");
const mage = $("#mage");
const marksman = $("#marksman");
const support = $("#support");
const tank = $("#tank");

$(searchBtn).on("click", function () {
  $(".dropdown_list").toggle();
});
$(difficultyBtn).on("click", function () {
  $(".dropdown_list2").toggle();
});

$(document).on("click", ".dropdown_item", function () {
  let champName = $(this).text();
  $(".search_name").text(champName);
  findChampName();
});

function findChampName() {
  let dropdownName = $(".search_name").text();
  let categoryFind = $(".champion_name_box span");
  let categoryName = $(categoryFind).find(dropdownName);
  console.log(dropdownName);
  console.log(categoryName);

  if ($(dropdownName == categoryName)) {
    $(categoryFind).parents(".champion_box").addClass("is_active");
  }
}

$(typeBtn).on("click", function () {
  let target = $(this);
  $(typeBtn).removeClass("is_active");
  $(target).addClass("is_active");

  // 테스트 후 switch로 변경이 나을 듯
  if ($(assassin).hasClass("is_active")) {
    $(".champion_list_area").find("#Assassin").fadeIn();
    $(".champion_list_area")
      .find("#Fighter, #Mage, #Marksman, #Support, #Tank")
      .fadeOut();
  } else if ($(fighter).hasClass("is_active")) {
    $(".champion_list_area").find("#Fighter").fadeIn();
    $(".champion_list_area")
      .find("#Assassin, #Mage, #Marksman, #Support, #Tank")
      .fadeOut();
  } else if ($(mage).hasClass("is_active")) {
    $(".champion_list_area").find("#Mage").fadeIn();
    $(".champion_list_area")
      .find("#Assassin, #Fighter, #Marksman, #Support, #Tank")
      .fadeOut();
  } else if ($(marksman).hasClass("is_active")) {
    $(".champion_list_area").find("#Marksman").fadeIn();
    $(".champion_list_area")
      .find("#Assassin, #Fighter, #Mage, #Support, #Tank")
      .fadeOut();
  } else if ($(support).hasClass("is_active")) {
    $(".champion_list_area").find("#Support").fadeIn();
    $(".champion_list_area")
      .find("#Assassin, #Fighter, #Mage, #Marksman, #Tank")
      .fadeOut();
  } else if ($(tank).hasClass("is_active")) {
    $(".champion_list_area").find("#Tank").fadeIn();
    $(".champion_list_area")
      .find("#Assassin, #Fighter, #Mage, #Marksman, #Support")
      .fadeOut();
  } else {
    $(".champion_list_area")
      .find("#Assassin, #Fighter, #Mage, #Marksman, #Support, #Tank")
      .fadeIn();
  }
});

function championList() {
  $.ajax({
    url: "https://ddragon.leagueoflegends.com/cdn/14.8.1/data/ko_KR/champion.json",
    dataType: "JSON",
    method: "GET",
    success: function (response) {
      if (response) {
        const champions = response.data;
        let championListHtml = "";
        let championNameBox = "";
        console.log(champions);
        $.each(champions, function (key, champion) {
          let championName = champion.name;
          let championId = champion.id;
          let championTag = champion.tags[0];

          console.log(championTag);
          championListHtml +=
            "<div class='champion_box' id=" +
            championTag +
            "><div class='champion_img_box'><img src='https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
            championId +
            "_0.jpg' alt=''></div><div class='champion_name_box'><span>" +
            championName +
            "</span></div></div>";

          championNameBox +=
            "<li class='dropdown_item champName' id=" +
            championTag +
            ">" +
            championName +
            "</li>";
        });
        $(".champion_list_area").append(championListHtml);
        $(".dropdown_list").append(championNameBox);
      }
    },
    error: function (xhr, status, error) {
      alert("데이터를 가져오는 중 오류가 발생했어요.");
    },
  });
}
championList();
