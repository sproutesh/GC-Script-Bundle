// ==UserScript==
// @name         TEST
// @namespace    grundos-cafe
// @version      1.1
// @description  Adds keyboard controls around GC
// @author       Z & Dij & Berna & Kait & mox
// @match        https://www.grundos.cafe/faerieland/employ/*
// @match        https://www.grundos.cafe/halloween/esophagor/*
// @match        https://www.grundos.cafe/island/kitchen/*
// @match        https://www.grundos.cafe/winter/snowfaerie/*
// @match        https://www.grundos.cafe/halloween/witchtower/*
// @match        https://www.grundos.cafe/halloween/braintree/*
// @match        https://www.grundos.cafe/safetydeposit/*
// @match        https://www.grundos.cafe/market/wizard/*
// @match        https://www.grundos.cafe/market/browseshop/?owner=*
// @match        https://www.grundos.cafe/games/*dicearoo/*
// @match        https://www.grundos.cafe/games/gormball/*
// @match        https://www.grundos.cafe/dome/1p/*battle/
// @match        https://www.grundos.cafe/adopt/*
// @match        https://www.grundos.cafe/faerieland/darkfaerie/*
// @license      MIT
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grundos.cafe
// ==/UserScript==

// if you want number keys 1,2,3,etc to map to the same quest locations every time,
 // toggle the override to 'true' and arrange the location URLs to your liking
 // you may also delete a link, or skip a number key
 // otherwise, the keys map to the locations in the order of your sidebar and
 // update dynamically (e.g. esophagor button goes away when time to go to brain tree)

const questSidebarOverride = true; //const questSidebarOverride = true;
const questOverrideActions = [ // digit key: link to quest
    {1: "/halloween/witchtower/"}, //Edna Quest
	{2: "/halloween/esophagor/"}, //Esophagor Quest
	{3: "/winter/snowfaerie/"}, //Taelia Quest
	{4: "/island/kitchen/"}, //Kitchen Quest
	{5: "/halloween/braintree/"}, //Brain Tree Quest
	{6: "/faerieland/darkfaerie/"}, //Jhudora's Quest
	{7: "/faerieland/employ/"}, //Faerieland Employment Agency
    {8: "/faerieland/quests/"} //Faerie Quests
];

//////////////////////////////////////////////////////////////////////////
/* globals $ */
 window.addEventListener("keydown", (event) => {
     if(event.target.matches("input[type='text']")) {return;} //if entering text in a text box, don't record keydown event
     let arrowKeyCount = 0;
     let digitKeyCount = 0; //initialize some useful variables
        switch (event.code) {
            case "Enter":
            case "NumpadEnter":
                if (location.pathname.match(/safetydeposit/)) {
                    const SDBrmOne = document.querySelector("a.sdb-remove-one-text");
                    if (SDBrmOne) SDBrmOne.click();
                } else if (location.pathname.match(/market\/browseshop/)) {
                    const USbuy = document.querySelector("#searchedItem.shop-item input[type='image']");
                    if (USbuy) USbuy.click();
                } else if (location.pathname.match(/market\/wizard/)) {
                    const SWsearch = document.querySelector("div.sw_search_submit input.form-control");
                    const SWshop = document.querySelector(".market_grid.sw_results .data a:nth-child(1)");
                    if (SWsearch) SWsearch.click();
                    else if (SWshop) SWshop.click();
                } else if (location.pathname.match(/halloween|island|winter/)) {
                    const questStart = document.getElementById("page_content").querySelector("form[action*='accept'] .form-control");
                    const questComplete = document.getElementById("page_content").querySelector(".form-control[onclick*='complete']");
                    const questRestart = document.getElementById("page_content").querySelector(".form-control:not([value*='Return'])");
                    if (questStart) questStart.click();
                    else if (questComplete) questComplete.click();
                    else if (questRestart) questRestart.click();
                } else if (location.pathname.match(/dicearoo/)) {
                    const dicearooRA = document.querySelector("form[id='roll-again'] > input[type='submit']");
                    const dicearooPM = document.querySelector("input[value='Press Me']");
                    const dicearooPlay = document.querySelector("form[action*='play_dicearoo'] > input[type='submit']");
                    if (dicearooPlay) dicearooPlay.click();
                    else if (dicearooRA) dicearooRA.click();
                    else if (dicearooPM) dicearooPM.click();
                } else if (location.pathname.match(/dome\/1p/)) {
                    const BDgo = document.querySelector("input[value='Go!']:not(.ignore-button-size)");
                    const BDnext = document.querySelector("input[value='Next']");
                    const BDrematch = document.querySelector("input[value='Rematch!']");
                    if (BDgo) BDgo.click();
                    else if (BDnext) BDnext.click();
                    else if (BDrematch) BDrematch.click();
                } else if (location.pathname.match(/adopt/)) {
                    const adoptNext = document.querySelector("input[value='Find a Neopet at Random']");
                    if (adoptNext) adoptNext.click();
                } else if (location.pathname.match(/gormball/)) {
                    let preferredPlayer = 3; //1=Thyassa, 2=Brian, 3=Gargarox, 4=Farvin III, 5=Ember, 6=COOL Zargrold, 7=Ursula, 8=Kevin
                    let preferredWait = 2; // seconds 1-5
                    let chooseAGorm = $(`.gormball_player[data-id="${preferredPlayer}"]`);
                    let playAGorm = $(".button-group input[value='Next >>>'], .button-group input[value='Throw!']");
                    if (chooseAGorm) chooseAGorm.click();
                    if (playAGorm) { $("select[name='turns_waited']").prop('selectedIndex', preferredWait-1); playAGorm.click();}
                } break;
            case "ArrowDown":
                arrowKeyCount++; //falls through, select the fourth item with down arrow
            case "ArrowRight":
                arrowKeyCount++; //falls through, select the third item with right arrow
            case "ArrowUp":
                arrowKeyCount++; //falls through, select the second item with up arrow
            case "ArrowLeft":
                arrowKeyCount++; //select the first item with left arrow
                if (location.pathname.match(/halloween|island|winter|faerieland/) && arrowKeyCount <= document.querySelector(".itemList").childElementCount) {
                    let itemInInv = document.querySelector(`.itemList .shop-item:nth-child(${arrowKeyCount}) img.search-helper-in-inv`);
                    let itemInSDB = document.querySelector(`.itemList .shop-item:nth-child(${arrowKeyCount}) img.search-helper-sdb-exists`);
                    if (itemInInv) {
                        console.log("since the item is already in your inv, you don't need to search anywhere for it!");
                        break;
                    }
                    else if (itemInSDB) { //if the item already exists in your SDB, click that icon to get it
                        itemInSDB.click();
                    } else { //if neither, search it on the SW
                        document.querySelector(`.itemList .shop-item:nth-child(${arrowKeyCount}) img.search-helper-sw`).click();
                    }
                } break;
            case "Digit0":
                digitKeyCount++; //falls through
            case "Digit9":
                digitKeyCount++; //falls through
            case "Digit8":
                digitKeyCount++; //falls through
            case "Digit7":
                digitKeyCount++; //falls through
            case "Digit6":
                digitKeyCount++; //falls through
            case "Digit5":
                digitKeyCount++; //falls through
            case "Digit4":
                digitKeyCount++; //falls through
            case "Digit3":
                digitKeyCount++; //falls through
            case "Digit2":
                digitKeyCount++; //falls through
            case "Digit1":
                if (questSidebarOverride && typeof questOverrideActions[digitKeyCount] != 'undefined') {
					let keyCheck = parseInt(Object.keys(questOverrideActions[digitKeyCount])) - 1;
                    if (digitKeyCount === keyCheck) window.location.assign(location.origin + Object.values(questOverrideActions[digitKeyCount]).toString());
                    else {console.log("Your quest order settings are incorrect, please check them!"); break;}
				} else if (!questSidebarOverride && digitKeyCount < document.querySelector(`div#aio_sidebar > .quests > .aioImg`).childElementCount) {
                    let rankOrderDiv = document.querySelectorAll('.quests .aioImg div');
                    let rankOrderList = Array.prototype.slice.call(rankOrderDiv).sort((a, b) => {
                        var aOrder = a.getAttribute('style').match(/order:(\d+)/)[1]; var bOrder = b.getAttribute('style').match(/order:(\d+)/)[1]; if (aOrder > bOrder) return 1; if (aOrder < bOrder) return -1; return 0;})
                    $(rankOrderList[digitKeyCount].firstChild.click());
                } else if (questSidebarOverride && typeof questOverrideActions[digitKeyCount] == 'undefined') { console.log("You didn't assign anything to that key.");
                } break;
        }
 });
