// ==UserScript==
// @name         Ruliweb Article Remover
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  루리웹 글삭기. 게시물 버전
// @author       hdd1013
// @match        *bbs.ruliweb.com/member/mypage/myarticle*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...
  var ruliFunctions = window.ruliFunctions = {};
  // var $articleTable = $("#myarticle").find(".text_over_table");
  var $articleTable = $("#myarticle").find("table");
  var delBtnHtml = "<div class=\"btn_light btn_delete\" style=\"\" onclick=\"ruliFunctions.delAllArticles();\">전체 삭제</div>";
  $articleTable.append(delBtnHtml);

  ruliFunctions.delAllArticles = function () {
    var articleData = [];
    for (var i = 0; i < $(".d_myarticle").length; i++) {
      let articleItem = $(".d_myarticle")[i];
      let currentArticle = {};
      // currentArticle.commentId = $(articleItem).attr("comment-id");
      currentArticle.articleId = $(articleItem).attr("article-id");
      currentArticle.boardId = $(articleItem).attr("board-id");
      currentArticle.isDeleted = false;
      articleData.push(currentArticle);
    }

    var t = 'https://api.ruliweb.com/';
    var deleteCounter = 0;
    for (var j = 0; j < articleData.length; j++) {
      var d = {};
      // d.comment_id = articleData[j].commentId;
      d.article_id = articleData[j].articleId;
      d.board_id = articleData[j].boardId;

      $.ajax({
        url: t + "procDeleteMyArticle",
        type: "POST",
        data: d,
        dataType: "json",
        xhrFields: {
          withCredentials: !0
        },
        success: function (e) {
          if (e.success) {
            deleteCounter++;
            if (deleteCounter == articleData.length) {
              alert("삭제완료");
              document.location.reload();
            }
          } else {
            console.log("success: ", e.commend_id)
          }
        },
        error: function () {
          alert("ajax failure")
        }
      })
    }
  }
})();
