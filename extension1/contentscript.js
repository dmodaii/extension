// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// function click(e) {
//     debugger
//     chrome.tabs.executeScript(null,
//         {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
//     // window.close();
//   }
//   document.addEventListener('DOMContentLoaded', function () {
//     var divs = document.querySelectorAll('div');
//     for (var i = 0; i < divs.length; i++) {
//       divs[i].addEventListener('click', click);
//     }
//   });



  // Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }
  