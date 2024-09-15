// ==UserScript==
// @name         GC Keyboard Controls Bundle ALPHA
// @namespace    grundos-cafe
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grundos.cafe
// @version      0.99b
// @description  Adds keyboard controls around GC
// @author       mox with code by Z & Dij & Berna & Kait & Shiba & Sanjix
// @match        https://www.grundos.cafe/*
// @match        https://www.grundos.cafe/faerieland/employ*
// @match        https://www.grundos.cafe/faerieland/darkfaerie*
// @match        https://www.grundos.cafe/halloween/esophagor*
// @match        https://www.grundos.cafe/island/kitchen*
// @match        https://www.grundos.cafe/winter/snowfaerie*
// @match        https://www.grundos.cafe/halloween/witchtower*
// @match        https://www.grundos.cafe/halloween/braintree*
// @match        https://www.grundos.cafe/water/fishing*
// @match        https://www.grundos.cafe/plateau/omelette*
// @match        https://www.grundos.cafe/*jelly*
// @match        https://www.grundos.cafe/island/tombola*
// @match        https://www.grundos.cafe/desert/fruitmachine*
// @match        https://www.grundos.cafe/faerieland/tdmbgpop*
// @match        https://www.grundos.cafe/wishing*
// @match        https://www.grundos.cafe/*merrygoround*
// @match        https://www.grundos.cafe/*tikitours*
// @match        https://www.grundos.cafe/*wheel*
// @match        https://www.grundos.cafe/*foodclub*
// @match        https://www.grundos.cafe/medieval/*king*
// @match        https://www.grundos.cafe/dome/battlepedia*
// @match        https://www.grundos.cafe/bank*
// @match        https://www.grundos.cafe/safetydeposit*
// @match        https://www.grundos.cafe/market/wizard*
// @match        https://www.grundos.cafe/market/browseshop/?owner=*
// @match        https://www.grundos.cafe/games/*dicearoo*
// @match        https://www.grundos.cafe/games/gormball*
// @match        https://www.grundos.cafe/games/bilgedice*
// @match        https://www.grundos.cafe/games/*slots*
// @match        https://www.grundos.cafe/games/snowwars*
// @match        https://www.grundos.cafe/games/pyramids*
// @match        https://www.grundos.cafe/medieval/kissthemortog*
// @match        https://www.grundos.cafe/games/tyranuevavu*
// @match        https://www.grundos.cafe/games/cheat/play*
// @match        https://www.grundos.cafe/dome/1p/*battle*
// @match        https://www.grundos.cafe/adopt*
// @match        https://www.grundos.cafe/games/lottery*
// @license      MIT
// @require      https://code.jquery.com/jquery-3.7.1.js
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        window.close
// ==/UserScript==
/////////////////// BEGIN USER SETTINGS

//////SIDEBAR NAVIGATION
// by default, this script links the Q/D/T/W keys
//    to sidebar links from any page on the site:
// Q navigates to your first available sidebar Quest item
// D navigates to your first available sidebar Dailies item
// T navigates to your first available sidebar Timelies item
// W navigates to your first available pet to fish (W for water)
//   if you don't want one or more of these keys to do this, toggle them below
const qKeyNavigation = true;
const dKeyNavigation = true;
const tKeyNavigation = true;
const wKeyNavigation = true;

// by default, the Dailies/Timelies "_ with all" and "Quick _" key for is "B"
//    but you may change it to a different letter or numpad key if preferred
const doItAllQuick = "KeyB"; //options: "Key[letter]" "Numpad[number]"
// NB: this applies to Fishing, Lottery, Wishing Well, Tiki Tour, Merry-Go-Round

// by default, the number keys (above QWERTY) map to the locations in the order of your sidebar and update dynamically
//    (e.g. esophagor button goes away when time to go to brain tree, no faerie quest button unless you have one)
// if you want to override this function and map the number keys (above QWERTY) to the same quest locations every time,
//    toggle the override to 'true' and arrange the location URLs to your liking, leaving the numbers in the same place
const questSidebarOverride = false; //false (default): number keys map 1:1 with visual buttons (and change as quests are completed)
//const questSidebarOverride = true; //true: number keys map exactly as below, every time
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
// NB: you can only navigate between the quest pages in this way when on one of the pages listed above

//////WISHING WELL FILL-IN
// by default, this script will input the recommended donation of 25 NP
//  and a default wish of "relic," but you may change the item or remove
//  the fill-in altogether if you want to type in both boxes every time
const wwFillInHelp = true;
const wwItemChoice = "relic";//change to "" to enter a new item each time but keep the NP fill-in
const wwDonationAmount = 25;

//////LOTTERY TICKETS
// by default, this script generates minimally-overlapping lottery numbers
//  based on this model:  https://www.andrew.cmu.edu/user/kmliu/neopets/lottery2.html
//  but if you don't want it to do that, you can override it here
const lotteryTicketModel = true;
// NB:  Quick Pick can be used with the override on/off, disabling this override would
//  allow you to pick all the lottery ticket numbers yourself for every ticket

//////GORMBALL
// choose your Gormball player and preferred wait time
const gormPlayer = 5; //1=Thyassa, 2=Brian, 3=Gargarox, 4=Farvin III, 5=Ember, 6=COOL Zargrold, 7=Ursula, 8=Kevin
const gormWait = 1; //  1-5 (in seconds), 1 is default

//////KISS THE MORTOG
// choose your Kiss The Mortog alert: 100, 300, 1150, 5900 [avatar], 35000, 250000, 2000000, 18000000
const mortogLimit = 5900;
// put "first" or "last" to choose only the first or last mortogs that appear in line
 // by default, a random (by computing standards) mortog will be chosen each time
const mortogFavorite = "random"; // "random"; "first"; "last";

//////BILGE DICE
// choose your Bilge Dice ante; if you haven't yet unlocked the option you select, you will bet 10 NP
const bilgeAnteAmount = 10; // choose from below values, all are in NP
const bilgeAnteChoices = [ 10, 50, 100, 200, 500, 1000 ];

/////////////////// END USER SETTINGS
//////////////////////////////////////////////////////////////////////////
// please see the bottom of the script for references!
/* global $ */

//initialize enhancements in functions and aorund the site
if (location.pathname.match(/bilgedice/)) bilgeDice();
if (location.pathname.match(/kissthemortog/)) kissTheMortog();
if (location.pathname.match(/slots/)) scorchySlots();
if (location.pathname.match(/snowwars/)) snowWars();
if (location.pathname.match(/pyramids/)) pyramids();
if (location.pathname.match(/tyranuevavu/)) tyranuEvavu();
if (location.pathname.match(/cheat/)) {cheat();}
if (location.pathname.match(/medieval\/.*king/)) $(function(){gwKing()});
if (location.pathname.match(/foodclub\/current_bets/)) fcBetCount();
if (location.pathname.match(/lottery/) && lotteryTicketModel) lotteryTicketNumbers();
if (location.pathname.match(/wishing/) && wwFillInHelp) {
    document.querySelector("input[name=donation]").value = wwDonationAmount;
    document.querySelector("input[name=wish'").value = wwItemChoice;}

window.addEventListener("keydown", (event) => { // credit to Z and Dij
    if(event.target.matches("input[type='text'], input[type='search'], input[type='number'], input[type='password'], textarea, [contenteditable=true]")) {return;}
    if(event.isComposing) {return;} //if entering text in a text box, don't record the event
    if(event.repeat) {return;} //don't respond to someone holding down a key such that it repeats
    if(event.altKey) {return;} //if pressing alt,
    if(event.ctrlKey) {return;} //           ctrl,
    if(event.shiftKey) {return;} //          shift,
    if(event.metaKey) {return;} //or mac:cmd pc:win with a key, don't record the event
    let bdStrMedW = 0;
    let arrowKeyCount = 0;
    let digitKeyCount = 0; //initialize some useful variables
    switch (event.code) {
    //Space - select all in Bilge Dice and Scorchy Slots, plus general "click confirm"
        case "Space":
            event.preventDefault();
            if (location.pathname.match(/bilgedice\/play/)) {
                bilgeDice('Space'); break; //prevent fall-through when playing Bilge Dice since Space is used differently
            } else if (location.pathname.match(/slots/)) {
                scorchySlots('Space'); break; //prevent fall-through when playing Scorchy Slots since Space is used differently
            }
    //Enter & NumpadEnter //Space falls through along with NumpadEnter
        case "NumpadEnter": //    so all three keys can be used interchangeably
        case "Enter": // as general "click to confirm" control keys
            if (location.pathname.match(/safetydeposit/)) { //remove one from SDB
                const SDBrmOne = document.querySelector("a.sdb-remove-one-text");
                if (SDBrmOne) SDBrmOne.click();
            } else if (location.pathname.match(/market\/browseshop/)) { //buy the searched item in a usershop
                const USbuy = document.querySelector("#searchedItem.shop-item input[type='image']");
                if (USbuy) USbuy.click();
            } else if (location.pathname.match(/market\/wizard/)) { //search the SW and navigate to the first shop shown
                const SWsearch = document.querySelector("div.sw_search_submit input[value='Search']");
                const SWshop = document.querySelector(".market_grid.sw_results .data a:nth-child(1)");
                if (SWshop) SWshop.click();
                else if (SWsearch) SWsearch.click();
            } else if (location.pathname.match(/witchtower|braintree|esophagor|kitchen|snowfaerie|employ|darkfaerie/)) {// credit to Z and Dij
                const questStart = document.querySelector("#page_content form[action*='accept'] .form-control");
                const questComplete = document.querySelector("#page_content .form-control[onclick*='complete']");
                const questRestart = document.querySelector("#page_content .form-control:not([value*='Return'])");
                const formButtons = document.querySelectorAll("#page_content form .form-control:not([type=\"text\"]), .form-control[type=button]");
                if (questStart) questStart.click();
                else if (questComplete) questComplete.click();
                else if (questRestart) questRestart.click();
                else if (formButtons.length === 1) {window.location.reload();}
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
                let chooseAGorm = $(`.gormball_player[data-id="${gormPlayer}"]`);
                const playAGorm = $("input[value='Next >>>'], input[value='Throw!'], input[value='Continue!']");
                if (chooseAGorm) chooseAGorm.click();
                if (playAGorm) {$("select[name='turns_waited']").prop('selectedIndex', gormWait-1); playAGorm.click();}
            } else if (location.pathname.match(/lottery/)) {
                const lotteryBuy = document.querySelector(".form-control[value='Buy a Lottery Ticket!']");
                if (lotteryBuy) lotteryBuy.click();
            } else if (location.pathname.match(/halloween\/wheel|prehistoric\/wheel|faerieland\/wheel|brightvale\/wheel/)) {
                const spinWheel = document.querySelector('input[value*="Spin the Wheel"]');
                if(spinWheel) spinWheel.click();
            } else if (location.pathname.match(/water\/fishing/)) {
                const fishOnce = document.querySelector("input[value='Reel in Your Line']");
                const castAgain = document.querySelector("a:has(img[title*='is ready to fish!'])");
                const setActivePet = document.querySelector("img[title^='Set Active Pet to '");
                if (fishOnce) fishOnce.click();
                else if (castAgain) castAgain.click();
                else if (!castAgain && setActivePet) setActivePet.click();
            } else if (location.pathname.match(/foodclub\/bet/)) {
                const fcPlaceBet = document.querySelector('input[value="Place this bet!"]');
                if (fcPlaceBet) fcPlaceBet.click();
            } else if (location.pathname.match(/medieval\/.*king/)) {
                const btnKing = document.querySelector("input[value*='the King']");
                if (btnKing) btnKing.click();
            } else if (location.pathname.match(/bank/)) {
                const bankInterest = document.querySelector('input[value*="Collect Interest"]');
                if (bankInterest) bankInterest.click();
            } else if (location.pathname.match(/medieval\/symolhole/)) {
                const symolHole = document.querySelector('input[value="Enter!"]');
                if (symolHole) symolHole.click();
            } else if (location.pathname.match(/desert\/shrine/)) {
                const coltzansShrine = document.querySelector('input[value="Approach the Shrine"]');
                if (coltzansShrine) coltzansShrine.click();
            } else if (location.pathname.match(/faerieland\/springs/)) {
                const healmypets = document.querySelector('input[value="Heal My Pets"]');
                if (healmypets) healmypets.click();
            } else if (location.pathname.match(/jelly\/greenjelly/)) {
                const greenJelly = document.querySelector('input[type="submit"].form-control.half-width');
                if (greenJelly) greenJelly.click();
            } else if (location.pathname.match(/jelly\/jelly/)) {
                const jelly = document.querySelector('input[value="Grab some Jelly"]');
                if (jelly) jelly.click();
            } else if (location.pathname.match(/plateau\/omelette/)) {
                const omelette = document.querySelector('input[value="Grab some Omelette"]');
                if (omelette) omelette.click();
            } else if (location.pathname.match(/island\/tombola/)) {
                const tombola = document.querySelector('input[value="Play Tombola!"]');
                if (tombola) tombola.click();
            } else if (location.pathname.match(/desert\/fruitmachine/)) {
                const fruitMachine = document.querySelector('input[value="Spin The Wheel!!!"]');
                if (fruitMachine) fruitMachine.click();
            } else if (location.pathname.match(/faerieland\/tdmbgpop/)) {
                const tdmbgpop = document.querySelector('input[value="Talk to the Plushie"]');
                if (tdmbgpop) tdmbgpop.click();
            } else if (location.pathname.match(/island\/training|pirates\/academy/)) {
                const courseSubmit = document.querySelector('input[value="Start Course"]');
                const payCourse = document.querySelector('input[value="Pay"]');
                const finishTraining = document.querySelector('input[value="Complete Course!"]');
                if (courseSubmit) courseSubmit.click();
                if (payCourse) payCourse.click();
                if (finishTraining) finishTraining.click();
            } else if (location.pathname.match(/pirates\/buriedtreasure/)) {
                const enterMap = document.querySelector('input[value="Click to Play"]');
                const mapClick = document.querySelector('input[class="clickable-image"]');
                if (enterMap) enterMap.click();
                if (mapClick) mapClick.click();
            } else if (location.pathname.match(/kiosk/)) {
                const kioskBuy = document.querySelector('button[onclick*="purchase-scratchcard"]');
                const kioskScratch = document.querySelector('input[value="Scratch!"]');
                if (kioskBuy) kioskBuy.click();
                else if (kioskScratch) kioskScratch.click();
            } else if (location.pathname.match(/scratchcard/)) { var scSpots; // credit to Sanjix
                if (location.pathname.match(/halloween|winter/)) scSpots = document.querySelectorAll('#scratchcard a[href*="tile"]:has(img[src$="0.gif"])');
                if (location.pathname.match(/desert/)) scSpots = document.querySelectorAll('#scratchcard a[href*="tile"]:not(:has(img))');
                let scSpotsRand = Math.floor(Math.random() * Math.floor(scSpots.length));
                if (scSpotsRand < scSpots.length) scSpots[scSpotsRand].click();
            } else if (location.pathname.match(/tyranuevavu/)) {
                const newGame = document.querySelector('input[value="Play Now!"]');
                const playAgain = document.querySelector('input[value="Play Again"]');
                if (newGame) newGame.click();
                if (playAgain) playAgain.click();
            } else if (location.pathname.match(/cheat/)) {
                const playAgain = document.querySelector('main input[value="Play Again"]');
                const resumePlay = document.querySelector('main input[value="Return to Game"]');
                const nextDiff = document.querySelector('input[value^="Continue to Difficulty"]');
                const playResolve = document.querySelector('input[value="Click to Continue"]');
                const myTurn = document.querySelector('main input[value="Go!"]');
                if (playAgain) {playAgain.click();}
                else if (resumePlay) {resumePlay.click();}
                else if (nextDiff) {nextDiff.click();}
                else if (playResolve) {playResolve.click();}
                else if (myTurn) {myTurn.click();}
            } else if (location.pathname.match(/bilgedice/)) { bilgeDice('Enter');
            } else if (location.pathname.match(/kissthemortog/)) { kissTheMortog('Enter');
            } else if (location.pathname.match(/slots/)) { scorchySlots('Enter');
            } else if (location.pathname.match(/snowwars/)) {snowWars('Enter');
            } else if (location.pathname.match(/pyramids/)) {pyramids('Enter');
            } break;
    // Arrow Keys
        case "ArrowDown":
            arrowKeyCount++; //falls through, select the fourth item with down arrow
        case "ArrowRight":
            arrowKeyCount++; //falls through, select the third item with right arrow
        case "ArrowUp":
            arrowKeyCount++; //falls through, select the second item with up arrow
        case "ArrowLeft":
            if (location.pathname.match(/witchtower|braintree|esophagor|kitchen|snowfaerie|employ|darkfaerie|dome\/1p|tyranuevavu|cheat|kiosk/)) event.preventDefault(); //don't move the page
            arrowKeyCount++; //select the first item with left arrow
            if (location.pathname.match(/witchtower|braintree|esophagor|kitchen|snowfaerie|employ|darkfaerie/)) {// credit to Z and Dij
                let questItemList = document.querySelectorAll(".shop-item");
                if (!questItemList.length) questItemList = document.querySelectorAll(".quest-item");
                if (arrowKeyCount < questItemList.length) {
                    let itemInInv = questItemList[arrowKeyCount].querySelector(`img.search-helper-in-inv`);
                    let itemInSDB = questItemList[arrowKeyCount].querySelector(`img.search-helper-sdb-exists`);
                    if (itemInInv) {console.log("since the item is already in your inv, you don't need to search anywhere for it!");break;}
                    else if (itemInSDB) { //if the item already exists in your SDB, click that icon to get it
                    itemInSDB.click();
                    } else { //if neither, search it on the SW
                        questItemList[arrowKeyCount].querySelector(`img.search-helper-sw`).click();
                    }
                } else {break;}
            } else if (location.pathname.match(/dome\/1p/) && document.querySelector('#bd-form select#ability.form-control')) {
                const bdOptions = document.querySelectorAll('#bd-form select#ability.form-control > option');
                const bdSelectedIndex = [...bdOptions].findIndex(e => e.value === document.querySelector('#bd-form select#ability.form-control').value);
                const bdOptionsLength = bdOptions.length;
                if (arrowKeyCount === 2 || arrowKeyCount === 3) { //right || up ("previous one")
                    bdOptions[(bdSelectedIndex - 1 + bdOptionsLength) % bdOptionsLength].selected = true; //previous item or loop to the bottom
                } else if (arrowKeyCount === 1 || arrowKeyCount === 4) { //left || down ("next one")
                    bdOptions[(bdSelectedIndex + 1) % bdOptionsLength].selected = true; //next item or loop to the top
                } else console.log("error in arrowKeyCount");
            } else if (location.pathname.match(/tyranuevavu/)) {
                const evLower = document.querySelector('input[value="lower"]');
                const tyHigher = document.querySelector('input[value="higher"]');
                if (evLower && tyHigher) {
                    if (arrowKeyCount === 2 || arrowKeyCount === 3) {
                        tyHigher.click();
                    } else if (arrowKeyCount === 1 || arrowKeyCount === 4) {
                        evLower.click();
                    } else console.log("error in arrowKeyCount");
                }
            } else if (location.pathname.match(/cheat/)) {
                const letSlide = document.querySelector('input[value="Let Slide"]');
                const accuseCheat = document.querySelector('input[value="Accuse of Cheating"]');
                if (letSlide && accuseCheat) { //right/up arrow to accuse, left/down arrow to let slide
                    if (arrowKeyCount === 2 || arrowKeyCount === 3) {
                        accuseCheat.click();
                    } else if (arrowKeyCount === 1 || arrowKeyCount === 4) {
                        letSlide.click();
                    } else console.log("error in arrowKeyCount");
                }
            } else if (location.pathname.match(/kiosk/)) {
                const kioskSCOptions = document.querySelectorAll(".select-wrapper select[name='card'] > option");
                const kioskSCSelectedIndex = [...kioskSCOptions].findIndex(e => e.selected === true);
                const kioskSCLength = kioskSCOptions.length;
                if (arrowKeyCount === 2 || arrowKeyCount === 3) { //right || up ("previous one")
                    kioskSCOptions[(kioskSCSelectedIndex - 1 + kioskSCLength) % kioskSCLength].selected = true; //previous item or loop to the bottom
                } else if (arrowKeyCount === 1 || arrowKeyCount === 4) { //left || down ("next one")
                    kioskSCOptions[(kioskSCSelectedIndex + 1) % kioskSCLength].selected = true; //next item or loop to the top
                } else console.log("error in arrowKeyCount");
            } break;
    // Number Keys (above QWERTY)
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
            if (location.pathname.match(/witchtower|braintree|esophagor|kitchen|snowfaerie|employ|darkfaerie/)) {
                if (questSidebarOverride && typeof questOverrideActions[digitKeyCount] != 'undefined') {
                    let keyCheck = parseInt(Object.keys(questOverrideActions[digitKeyCount])) - 1;
                    if (digitKeyCount === keyCheck) window.location.assign(location.origin + Object.values(questOverrideActions[digitKeyCount]).toString());
                    else {console.log("Your quest order settings are incorrect, please check them!"); break;}
                } else if (!questSidebarOverride && digitKeyCount < document.querySelector(`div#aio_sidebar > .quests > .aioImg`).childElementCount) {
                    let rankOrderList = [...document.querySelectorAll('.quests .aioImg div')].sort((a, b) => a.style.order - b.style.order);
                    rankOrderList[digitKeyCount].firstChild.click();
                } else if (questSidebarOverride && typeof questOverrideActions[digitKeyCount] == 'undefined') {
                    console.log("You didn't assign anything to that key.");}
            } else if (location.pathname.match(/dome\/1p/)) {
                let bdEquips = document.querySelectorAll('#bd-form table input[type="checkbox"]');
                if (bdEquips && digitKeyCount < bdEquips.length) {
                    let checkbox = bdEquips[digitKeyCount];
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change', {bubbles: true})); }
            } else if (location.pathname.match(/scratchcard/)) {
                let scNumSpot = document.querySelector(`#scratchcard a[href*="tile=${digitKeyCount}"]:not(:has(img))`);
                if (scNumSpot) scNumSpot.click();
            } else if (location.pathname.match(/bilgedice/)) {
                bilgeDice(digitKeyCount);
            } else if (location.pathname.match(/slots/)) {
                scorchySlots(digitKeyCount);
            } else if (location.pathname.match(/pyramids/)) {
                pyramids(digitKeyCount);
            } break;
    // Miscellaneous Keys
        case "Numpad0": //close the usershop/SDB/SW search results/FC bet page/battlepedia with numpad 0
            if (location.pathname.match(/market\/browseshop|safetydeposit|market\/wizard|battlepedia|foodclub\/current_bets/)) {
                window.close();
            } break;
        // quick navigation for Dailies, Timelines, Quests, and Water(fishing)
        case "KeyD": //Dailies
            if (!dKeyNavigation) {
                let dArr = [...document.querySelectorAll('div.dailies a')]?.sort((a, b) =>
                               parseInt(a.parentElement.style.order) - parseInt(b.parentElement.style.order)).map((e,i,arr) => {
                                   if (e.href.match(/turmaculus|games\/featured/)) {return} else return e; }).filter(Boolean);
                if (dArr[0]) {dArr[0].click();}
            } break;
        case "KeyT": //Timelies
            if (tKeyNavigation) {
                let tArr = [...document.querySelectorAll('div.timelies a')]?.sort((a, b) =>
                               parseInt(a.parentElement.style.order) - parseInt(b.parentElement.style.order)).map((e,i,arr) => {
                                   if (e.children[0].className.match(/aio-kad-fed/)) {return} else return e; }).filter(Boolean);
                if (location.pathname.match(/prehistoric\/wheel/)) {
                    if (document.querySelector('input[value="Donate to Plesio"]')) tArr = tArr.map((e,i,arr) => {if (e.href.match(/prehistoric\/wheel/)) {return} else return e;}).filter(Boolean);
                }
                // let faveKiosk = 'winter'; if (tArr[0].href.match(/kiosk/)) {} else
                if (tArr[0]) {tArr[0].click();}
            } break;
        case "KeyQ": //Quests
            if (qKeyNavigation) {
                let qArr = [...document.querySelectorAll('div.quests a')]?.sort((a, b) => parseInt(a.parentElement.style.order) - parseInt(b.parentElement.style.order));
                if (qArr[0]) {qArr[0].click();}
            } break;
        case "KeyW": //Water(fishing)
            if (wKeyNavigation) {
                const newCast = document.querySelector("a:has(img[title*='is ready to fish!'])");
                if (newCast) newCast.click();
            } break;
        case doItAllQuick: //Quick __ and __ with all
            if (location.pathname.match(/lottery/)) {
                const quickPick = document.querySelector("input[value='Quick Pick!']");
                if (quickPick) quickPick.click();
            } else if (location.pathname.match(/wishing/)) {
                const quickWish = document.querySelector("input[name='quick-wish']");
                if (quickWish) {quickWish.click();}
            } else if (location.pathname.match(/water\/fishing/)) {
                const allFishing = document.querySelector("input[value='Fish with Everyone!']");
                if (allFishing) allFishing.click();
            } else if (location.pathname.match(/merrygoround/)) {
                const allMerryGoRound = document.querySelector("input[value^='Cheer Up']");
                if (allMerryGoRound) allMerryGoRound.click();
            } else if (location.pathname.match(/tikitours/)) {
                const allTikiTours = document.querySelector("button[name='all_pets']");
                if (allTikiTours) allTikiTours.click();
            } break;
        //choose strong/medium/weak for BD attacks
        case "KeyS":
            bdStrMedW++; //falls through
        case "KeyM":
            bdStrMedW++; //falls through
        case "KeyW":
            if (location.pathname.match(/dome\/1p/)) {
                const bdSMWOption = document.querySelector('#bd-form select#power.form-control');
                if (bdSMWOption) {bdSMWOption.value = bdStrMedW === 2 ? 'strong' : bdStrMedW === 1 ? 'medium' : 'weak';}
            } break;
    }
});
/////////////////// Bilge Dice (credit to Kait)
async function bilgeDice (keyEntered) {
    //initialize our win streak async functions for GM.setValue and GM.getValue [synchronous GM_s/getValue are deprecated]
	const BDSTORE = 'bilgedice-winstreak';
	const getBDWinStreak = async () => { return await GM.getValue(BDSTORE); }
	const bdWinStreak = await getBDWinStreak();
    //initialize winstreak in case of error or new install
    if (typeof bdWinStreak === 'undefined') {GM.setValue(BDSTORE, "Current win streak: ???");}
    // initialize the checkboxes array, if possible
    const bdCheckboxes = document.querySelectorAll('input[id*="roll_"]');
    // add win streak text and/or instruct regarding checkboxes but ONLY ONCE
    if (!document.querySelector('#page_content').textContent.includes("Current win streak")) {
		const bdWinStreakDiv = document.createElement('div');
        bdWinStreakDiv.textContent = `${bdWinStreak}`;
        bdWinStreakDiv.setAttribute("style", "font-size: 12px; text-align: center;");
		document.querySelector('#page_content').appendChild(bdWinStreakDiv);
	}
    if (!document.querySelector('#page_content').textContent.includes("(Use number keys to select or press spacebar to select all)") && bdCheckboxes.length) {
        const bdSpaceText = document.createElement('p');
        bdSpaceText.setAttribute("style", "height: auto; font-size: 10px; width: auto; font-weight: bold; text-align: center;");
        bdSpaceText.textContent= "(Use number keys to select or press spacebar to select all)";
        document.querySelector("#bilge-dice-user-wrapper > form").insertAdjacentElement('afterend', bdSpaceText);
    }
    // on the front page, choose the ante automagically upon player pressing Enter
    let bilgeAnteCode = parseInt(bilgeAnteChoices.indexOf(bilgeAnteAmount)) + 1;
    if (!document.querySelector(`input[name="bet_${bilgeAnteCode}"]`) && document.querySelector(`input[name="bet_1"]`)) {
		bilgeAnteCode = 1;
		console.log("Defaulted to 10 NP bet, user selection does not exist");
	} else if (document.querySelector(`input[name="bet_${bilgeAnteCode}"]`)) {
		if (keyEntered === 'Enter') {
            console.log("ante: " + bilgeAnteAmount + " NP");
            document.querySelector(`input[name="bet_${bilgeAnteCode}"]`).click();
        }
	}
    // on the front page, update the win streak and set it if possible
	if (location.pathname.match(/bilgedice/) && !location.pathname.match(/play/) && !location.pathname.match(/results/)) {
		const bdWinStreakElement = document.querySelector("#page_content div.center.mt-2 p");
		const bdWinStreakTemp = bdWinStreakElement ? bdWinStreakElement.textContent : null;
		if (bdWinStreakTemp) { GM.setValue(BDSTORE, bdWinStreakTemp); console.log("stored bilgedice-winstreak", bdWinStreakTemp); }
        //if a number key is entered on this page, its relative ante position will be selected, if possible
        if (typeof keyEntered === 'number') {
            bilgeAnteCode = 1 + keyEntered;
            if (document.querySelector(`input[name="bet_${bilgeAnteCode}"]`)) {
				console.log("ante chosen: " + bilgeAnteChoices[keyEntered] + " NP");
				document.querySelector(`input[name="bet_${bilgeAnteCode}"]`).click();
			}
        }
	}
    // in the play window, handle checkboxes with number keys/spacebar and the rest with enter
	if (location.pathname.match(/bilgedice\/play/) || location.pathname.match(/bilgedice\/results/)) {
        if (typeof keyEntered === 'number' && keyEntered < bdCheckboxes.length) {
			bdCheckboxes[keyEntered].checked = !bdCheckboxes[keyEntered].checked;
			bdCheckboxes[keyEntered].dispatchEvent(new Event('change', { bubbles: true }));
		} else if (keyEntered === 'Space') {
			bdCheckboxes.forEach(checkbox => {
				checkbox.checked = !checkbox.checked; checkbox.dispatchEvent(new Event('change', { bubbles: true })); } );
        } else if (keyEntered === 'Enter') document.querySelector('input[value="Keep"], input[value*="scallywags"], input[value*="Play Again"], input[value*="Play again"]').click();
	}
}
/////////////////// Kiss The Mortog (credit to Kait)
function kissTheMortog (keyEntered) {
    //initialize the mortogs array, if possible
    const mortogElements = document.querySelectorAll('#mortogs > div > form[action*="process_kissthemortog"]');
    //on a win, check if player reached their selected prize pot value, alert them if so
	if (document.querySelector('input[value="Continue"]')) {
        let ktmPrizePot = parseInt(document.querySelector('main p.center:nth-of-type(2) strong').innerText.match(/(\d+) NP/)[1]);
        if (ktmPrizePot >= mortogLimit && !Boolean(keyEntered)) {
            alert("Prize limit reached! Consider cashing out at this time. Pressing Enter will continue playing.");
            document.querySelector('main form input.form-control[value*="Winnings"]').setAttribute("style", "background-color: IndianRed;");
        }
	}
    //process enter key functions
    if (keyEntered === 'Enter') {
        //if there are mortogs, choose one based on user preferences
		if (mortogElements.length) {
            //random choice
            if (mortogFavorite === "random") {
				randomMortog();
			//choose only first mortogs
			} else if (mortogFavorite === "first") {
                console.log("user prefers first mortog, chose mortog[0]");
				mortogElements[0].submit();
			//choose only last mortogs
			} else if (mortogFavorite === "last") {
                let last = mortogElements.length-1;
                console.log("user prefers last mortog, chose mortog[" + last + "]");
				mortogElements[last].submit();
			//user selection did not compute, choose randomly
			} else {
                console.log("error in mortogFavorite selection, defaulting to random");
                randomMortog();
            }
        //otherwise, select the play/next button
		} else document.querySelector('input[value="Continue"], input[value*="Try again"]').click();
	}
    //since we want to choose a random mortog in two circumstances, make it into a function
    function randomMortog () {
        const randomIndex = Math.floor(Math.random() * mortogElements.length);
        console.log("randomly chose mortog[" + randomIndex + "]");
        mortogElements[randomIndex].submit();
	}
}
/////////////////// Scorchy Slots (credit to Kait)
async function scorchySlots (keyEntered) {
    //initialize our collective winnnings async functions for GM.setValue and GM.getValue [synchronous GM_s/getValue are deprecated]
    const SSSTORE = 'scorchyslots-winnings';
    const getSSWinnings = async () => { return JSON.parse(await GM.getValue(SSSTORE, '{}')); }
    const ssWinnings = await getSSWinnings();
    // add winnings text but ONLY ONCE
    if (!document.querySelector('#page_content').textContent.includes("Session winnings")) {
        const ssWinningsDiv = document.createElement('div');
        ssWinningsDiv.textContent = `${ssWinnings.session} / ${ssWinnings.total}\nDon't forget to go back to Scorchy Slots Home to update your total winnings after this session!`;
        ssWinningsDiv.setAttribute("style", "text-align: center; font-size: 10px; white-space: pre-wrap;");
        document.querySelector('#page_content').appendChild(ssWinningsDiv);
    }
    //check if a random event is happening now
    let randEvent = document.querySelector("#page_event div.re_text");
    let ssRENP = 0; //set the amount of NP it awarded/took away to 0 as default
    if (randEvent) {ssRENP = ssRandEvent(randEvent);} //run the random event function if an event did happen, which will return a +/- value of NP if applicable
    //initialize NP on hand for tabulation of session NP changes
    let npOnHand = parseInt(document.querySelector("#userinfo #on-hand-np").textContent.toString().replace(/,/g, ""));
    //initialize storage of winnings in case of error or new install
    if (typeof ssWinnings.total === 'undefined' && !ssWinnings.total) {
        let tempNewSSWinnings = {total: `Total winnings: 0 NP`, session: `Session winnings: 0 NP`, onhand: npOnHand};
        console.log("set scorchyslots-winnings", tempNewSSWinnings);
        GM.setValue(SSSTORE, JSON.stringify(tempNewSSWinnings));
    }
    //on loading the main Scorchy Slots page, pass session winnings (or losses) into total, reset session value to 0
    if (location.pathname.match(/games\/slots/)) {
        let tempWinSession = parseInt(/(?<=gs: )([\d,+-]+)(?= NP)/.exec(ssWinnings.session)[0].replace(/,/g, ""));
        let tempWinTotal = parseInt(/(?<=gs: )([\d,+-]+)(?= NP)/.exec(ssWinnings.total)[0].replace(/,/g, ""));
        let tempWinnings = Intl.NumberFormat("en-US", {signDisplay: "exceptZero"}).format(tempWinSession + tempWinTotal + ssRENP);
        let tempNewSSWinnings = {total: `Total winnings: ${Intl.NumberFormat("en-US", {signDisplay: "exceptZero"}).format(tempWinnings)} NP`, session: `Session winnings: 0 NP`, onhand: npOnHand};
        console.log("set scorchyslots-winnings", tempNewSSWinnings);
        GM.setValue(SSSTORE, JSON.stringify(tempNewSSWinnings));
    }
    //initialize the checkboxes hold array, if possible
    const scorchyCheckboxes = document.querySelectorAll('#scorchy-hold input[name*="scorchy_hold_"]');
    //when the user is prompted to hold...
    if (scorchyCheckboxes.length) {
        //create the element containing instructions regarding checkboxes but ONLY ONCE
        if (!document.querySelector('#page_content').textContent.includes("Select which reels to hold")) {
			const ssSpaceText = document.createElement('p');
			ssSpaceText.setAttribute("style", "height: auto; font-size: 10px; width: auto; font-weight: bold; text-align: center;");
			ssSpaceText.textContent= "Select which reels to hold using number keys 1-4 or spacebar to select all";
			document.querySelector("#scorchy-inner-wrapper > div#scorchy-hold.scorchy-row").insertAdjacentElement('beforebegin', ssSpaceText);
		}
        //if a number key is pressed, select that # hold slot
		if (typeof keyEntered === 'number' && keyEntered < scorchyCheckboxes.length) {
			scorchyCheckboxes[keyEntered].checked = !scorchyCheckboxes[keyEntered].checked;
			scorchyCheckboxes[keyEntered].dispatchEvent(new Event('change', { bubbles: true }));
        //if spacebar is pressed, select all
		} else if (keyEntered === 'Space') {
			scorchyCheckboxes.forEach(checkbox => {
				checkbox.checked = !checkbox.checked;
				checkbox.dispatchEvent(new Event('change', { bubbles: true }));
			});
		}
    }
    //handle enter key usage
    if (keyEntered === 'Enter') {
        //while on the play page...
        if (location.pathname.match(/play_slots/)) {
            //...update the session NP based on values just prior to navigating to the next page (with enter)
            let tempSessionWinnings = parseInt(/(?<=gs: )([\d,+-]+)(?= NP)/.exec(ssWinnings.session)[0].replace(/,/g, ""));
            let onHandTemp = ssWinnings.onhand;
            let ssSessionTemp = npOnHand - onHandTemp + tempSessionWinnings + ssRENP;
            console.log(npOnHand, onHandTemp, tempSessionWinnings, ssSessionTemp);
            let tempNewSSWinnings = {total: ssWinnings.total, session: `Session winnings: ${Intl.NumberFormat("en-US", {signDisplay: "exceptZero"}).format(ssSessionTemp)} NP`, onhand: npOnHand};
            console.log("set scorchyslots-winnings", tempNewSSWinnings);
            GM.setValue(SSSTORE, JSON.stringify(tempNewSSWinnings));
        } //this keeps values from updating with every checkbox entry
        document.querySelector('input[value="Click Here to Play"], input[value="Collect Winnings"], input[value="Play Again"]').click();
	}
    //handle random events that might occur on Scorchy Slots pages that affect NP values [WIP, still collecting text for applicable events]
    function ssRandEvent (randEvent) {
        let reNP = 0;
        reNP = randEvent?.innerText?.match(/([\+d,]+)(?= N?n?eopoints| NP| np)/)[0]?.replace(/,/g, "");
        if (reNP) {
            if (/gives you|[Ff]+ortune|[Tt]+reasure|spilled/.test(randEvent.innerText)) {}
            else if (/steal|appropriate|take|lose/.test(randEvent.innerText)) reNP = 0-reNP;
            return reNP;
        }
    }
}
/////////////////// Snow Wars (credit to Dij & Kait)
async function snowWars (keyEntered) {
    const SWSTORE = 'snowwars-memory';
    const getSWMemory = async () => { return JSON.parse(await GM.getValue(SWSTORE, '{}')); }
    const swMemory = await getSWMemory();

    var swClickSpots, swIndex;
    const swBoard = document.querySelector("div.snowwars-board-container.flex");
    if (swBoard && !swClickSpots) {swClickSpots = [...swBoard.querySelectorAll("div.snowwars-spot:not(.snowwars-axis) > a")].reduce((acc, cur) =>
                                                          ({...acc, [cur.outerHTML.match(/(?<=Attack\(event, ')[\d]+(?='\)\")/)[0]]: cur}), 0);}
    //initialize storage with new game, use 0 as first cell when enter is pressed
    if (document.querySelector('#page_content').textContent.includes("Welcome to Snow Wars") || typeof swMemory.lastcell === 'undefined') {
        console.log("storing",JSON.stringify({lastcell: 0, total: 0, bookmark: 0}));
        await GM.setValue(SWSTORE, JSON.stringify({lastcell: 0, total: 0, bookmark: 0}));
    }
    //handle Enter key
    if (keyEntered === 'Enter' && swClickSpots) {
        if (swClickSpots[swMemory.lastcell]) swClickSpots[swMemory.lastcell].click();
        //else swBoard.querySelector(`div.snowwars-board-container.flex > a[onclick='${swMemory.lastcell}']`).click();
    } else if (keyEntered === 'Enter') {
        document.querySelector("input[value='Continue Game'], input[name='start_round']").click();
    }
    //on the gameboard page...
    if (!keyEntered && swBoard && !swClickSpots[swMemory.lastcell]) {
        swIndex = swMemory.lastcell;
        if (swMemory.lastcell != swMemory.bookmark) swIndex = swMemory.bookmark;
        //find next play based on checkerboard grid
        while (!swClickSpots[swIndex] && swIndex < 48) {
            swIndex = selectNextNum(swIndex);
        }
        if (swIndex >= 48) {
            swIndex = 1;
            while (!swClickSpots[swIndex] && swIndex < 48) {
                swIndex = selectNextNum(swIndex);
            }
        }
        console.log("found next spot", JSON.stringify(swIndex));
        console.log("storing",JSON.stringify({lastcell: swIndex, total: swMemory.total, bookmark: swIndex}));
        await GM.setValue(SWSTORE, JSON.stringify({lastcell: swIndex, total: swMemory.total, bookmark: swIndex}));
    }
    //on the "results page...
    if (!keyEntered && !swBoard && document.querySelector("#page_content").textContent.includes("You fire at")) {
        //store temporary values of the memory values for manipulation if needed
        let tempTotal = 1 + swMemory.total;
        let tempLast = swMemory.lastcell;
        //check if the user clicked a value that was different from the one intended
        let crossCheck = document.querySelector("#page_content").textContent.match(/(?<=You fire at )[A-F][0-9]+(?= - )/)[0].split("");
        let crossCheckCoord = (crossCheck[0].charCodeAt(0) - 65) * 8 + parseInt(crossCheck[1]) - 1;
        if (crossCheckCoord != swMemory.lastcell) {console.log("You clicked "+crossCheckCoord+" instead of my pick of "+swMemory.lastcell); tempLast = crossCheckCoord; }
        //if a hit was recorded, activate the flag to process the next spot
        if (document.querySelector("img[src*='hit.gif']")) {
            console.log("hit! coord: " + JSON.stringify(tempLast));
        }
        console.log("storing7",JSON.stringify({lastcell: tempLast, total: tempTotal, bookmark: swMemory.bookmark}));
        await GM.setValue(SWSTORE, JSON.stringify({lastcell: tempLast, total: tempTotal, bookmark: swMemory.bookmark}));
    }
    //make a checkerboard pattern on the gameboard
    function selectNextNum (index) {
        if (index % 8 == 7) {return index + 1;} //last of row, move to first of next row
        else if (index % 8 == 6) {return index + 3;} //one before end of row, move to one after start of next row
        else {return index + 2;} //otherwise, every other
    }
}
/////////////////// Pyramids (credit to Shiba)
function pyramids (keyEntered) {
    const pyrCardStorage = {
        'key': 'pyramids-counts',
        'get': function(suit) {
            const counts = JSON.parse(localStorage?.getItem(this.key)) || {};
            return suit ? counts[suit] : counts;
        },
        'set': function(suit,cards) {
            const counts = pyrCardStorage.get();
            console.log("setter", counts, suit, cards);
            counts = Object.assign(counts[suit],{[suit]: cards.slice()});
            localStorage.setItem(this.key, JSON.stringify(counts));
        },
        'reset': function() {
            let cards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
            let suits = ['clubs','diamonds','hearts','spades'];
            let deck = Object.assign(...suits.map((k, i) => ({[k]: cards.slice()})));
            localStorage.setItem(this.key, JSON.stringify(deck));
        },
        'del': function(suit,card) {
            const deck = pyrCardStorage.get();
            if (deck[suit].includes(card)) {
                deck[suit].splice(deck[suit].indexOf(card),1);
            }
            localStorage.setItem(this.key, JSON.stringify(deck));
        },
    }
    const newGame = document.querySelector('input[value="Play Pyramids!"]');
    const ongoing = document.querySelector('input[class="btn-link"]');
    window.addEventListener("load", (event) => {
        if (ongoing) {
            const counts = pyrCardStorage.get();
            //count clickable face-up pyramid cards
            let clickableFaceUp = [...document.querySelectorAll('img.face_up.clickable')].reduce((acc, e) => {
                let [_, num, suit] = /(?<=solitaire\/)(\d+)(?:_)(spades|hearts|clubs|diamonds)(?:.gif)/.exec(e.src) || [];
                if (num) acc[suit] ||= []; acc[suit].push(num > 10 ? ['J', 'Q', 'K', 'A'][num - 11] || num : num);
                return acc;}, {});
            Object.entries(clickableFaceUp).forEach(([suit, cards]) => cards.forEach(card => pyrCardStorage.del(suit, card)));
            //count face-up draw pile cards
            let drawFaceUp = /(?<=solitaire\/)(\d+)(?:_)(spades|hearts|clubs|diamonds)(?:.gif)/.exec(document.querySelector('img.hand.face_up').src);
            if (drawFaceUp) pyrCardStorage.del(drawFaceUp[2], drawFaceUp[1] > 10 ? ['J', 'Q', 'K', 'A'][drawFaceUp[1] - 11] || drawFaceUp[1] : drawFaceUp[1]);
            //sum card counts
            const cardCountsSum = {"2": 0,"3": 0,"4": 0,"5": 0,"6": 0,"7": 0,"8": 0,"9": 0,"10": 0,"J": 0,"Q": 0,"K": 0,"A": 0};
            for (const suit in counts) {
                counts[suit].forEach(card => {
                    if (cardCountsSum.hasOwnProperty(card)) {
                        cardCountsSum[card]++; } });}
            //add table
            if ($('#pyramids_counts').length && !$('#card-count-grid').length) {
                $('<style>').text(`#card-count-grid {display: table; width: inherit; background-color: var(--bgcolor);}
                #card-count-grid td {border-left: 1px solid white; border-top: 1px solid white;}
                #card-count-grid table {border-spacing: 0; width: inherit;}`).appendTo('head');
                let tableHTML = `<span class="flex center-items justify-center no-right-border" id="card-count-grid"><table><tr>` +
                    Array.from({length: 13}, (_, i) => `<td style="font-weight: bolder; font-style: italic;" id='${i}'>${Object.keys(cardCountsSum)[i]}</td>`).join('') + `</tr><tr>` +
                    Array.from({length: 13}, (_, i) => { let condStyle = '';
                           if (Object.values(cardCountsSum)[i] === 2) {
                               condStyle = 'background-color: #3a4b23; ';
                    } else if (Object.values(cardCountsSum)[i] === 1) {
                        condStyle = 'background-color: #8f6d2a; ';
                    } else if (Object.values(cardCountsSum)[i] === 0) {
                        condStyle = 'background-color: #84422a; ';
                    } return `<td style="${condStyle}font-family: math;">${Object.values(cardCountsSum)[i]}</td>`;
                                                       }).join('') + `</tr></table></span>`;
                $('#pyramids_counts').append(tableHTML);
            }
        }
        if (newGame) {
            pyrCardStorage.reset();
            console.log("pyrCardStorage reset");
        }
    });
    let pClickCards = document.querySelectorAll('img.face_up[onclick="click_card(this)"]');
    let pClickSort = [...pClickCards].sort((a,b) => a.className.match(/(?<=card_)(\d)+(?= )/)[0] - b.className.match(/(?<=card_)(\d)+(?= )/)[0]);
    if (typeof keyEntered === 'number' && keyEntered < pClickSort.length) {
        pClickSort[keyEntered].click();
    }
    if (keyEntered === 'Enter') {
        let pClickDeck = document.querySelector('img.deck.clickable[onclick="click_card(this)"]');
        let pCollect = document.querySelector('input[value="Collect Winnings"]');
        let pWin = document.querySelector('input[value="Automatically Finish & Collect Winnings"]');
        let pPlayAgain = document.querySelector('input[value="Play Pyramids Again!"]');
        if (pClickDeck) pClickDeck.click();
        else if (pWin) pWin.click();
        else if (pCollect && document.querySelector('#page_content').textContent.includes("You do not have any draws left")) {
            if (confirm("Are you sure you want to end the game?")) {pCollect.click();} else {alert("The game will continue.");}
        } else if (newGame) newGame.click();
        else if (pPlayAgain) pPlayAgain.click();
    }
}
/////////////////// Tyranu Evavu (credit to Sanjix)
function tyranuEvavu () {
    const teCardStorage = {
        'key': 'tyranuevavu-counts',
        'get': function(suit) {
            const counts = JSON.parse(localStorage?.getItem(this.key)) || {};
            return suit ? counts[suit] : counts;
        },
        'set': function(suit,cards) {
            const counts = teCardStorage.get();
            counts = Object.assign(counts[suit],{[suit]: cards.slice()});
            localStorage.setItem(this.key, JSON.stringify(counts));
        },
        'reset': function() {
            let cards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
            let suits = ['clubs','diamonds','hearts','spades'];
            let deck = Object.assign(...suits.map((k, i) => ({[k]: cards.slice()})));
            localStorage.setItem(this.key, JSON.stringify(deck));
            console.log("reset tyranuevavu-counts");
        },
        'del': function(suit,card) {
            const deck = teCardStorage.get();
            if (deck[suit].includes(card)) {
                deck[suit].splice(deck[suit].indexOf(card),1);
            }
            localStorage.setItem(this.key, JSON.stringify(deck));
        },
    }
    const newGame = document.querySelector('input[value="Play Now!"]');
    const playAgain = document.querySelector('input[value="Play Again"]');
    const evLower = document.querySelector('input[value="lower"]');
    const tyHigher = document.querySelector('input[value="higher"]');
    window.addEventListener("load", (event) => {
        if (evLower && tyHigher) {
            const counts = teCardStorage.get(); //<img src="https://grundoscafe.b-cdn.net/games/php_games/tyranuevavu/4_spades.gif">

            let drawPlayCard = /(?<=tyranuevavu\/)(\d+)(?:_)(spades|hearts|clubs|diamonds)(?:.gif)/.exec(document.querySelector('div.te-cards img').src);
            if (drawPlayCard) teCardStorage.del(drawPlayCard[2], drawPlayCard[1] > 10 ? ['J', 'Q', 'K', 'A'][drawPlayCard[1] - 11] || drawPlayCard[1] : drawPlayCard[1]);
            //sum card counts
            const cardCountsSum = {"2": 0,"3": 0,"4": 0,"5": 0,"6": 0,"7": 0,"8": 0,"9": 0,"10": 0,"J": 0,"Q": 0,"K": 0,"A": 0};
            for (const suit in counts) {
                counts[suit].forEach(card => {
                    if (cardCountsSum.hasOwnProperty(card)) {
                        cardCountsSum[card]++; } });}
            var directionElement = Object.assign(document.createElement('p'), { className: 'te-directions' });
            let smallerCards = [];
            let biggerCards = [];
            const cardFaceOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
            const cardNumberOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
            const drawnCardValue = drawPlayCard[1];
            for (const card in cardCountsSum) {
                if (cardFaceOrder.indexOf(card) < cardNumberOrder.indexOf(drawnCardValue)) {
                    let temp = Array(cardCountsSum[card]);
                    temp.fill(card);
                    smallerCards = smallerCards.concat(temp);
                } else if (cardFaceOrder.indexOf(card) > cardNumberOrder.indexOf(drawnCardValue)) {
                    let temp = Array(cardCountsSum[card]);
                    temp.fill(card);
                    biggerCards = biggerCards.concat(temp);} }
            console.log("lower: " + smallerCards.length + " / higher: " + biggerCards.length);
            let probTE;
            if (smallerCards.length > biggerCards.length) {
                probTE = (smallerCards.length)/(smallerCards.length + biggerCards.length);
                directionElement.textContent = `${Intl.NumberFormat("en-US", {style: "percent"}).format(probTE)} chance it's Evavu/Lower`;
            } else if (smallerCards.length < biggerCards.length) {
                probTE = (biggerCards.length)/(biggerCards.length + smallerCards.length);
                directionElement.textContent = `${Intl.NumberFormat("en-US", {style: "percent"}).format(probTE)} chance it's Tyranu/Higher`;
            } else { directionElement.textContent = 'Either'; }
            if (!document.querySelector('p.te-directions')) {
                document.querySelector('.te-buttons').prepend(directionElement);
            }
        }
        else if (newGame) {
            teCardStorage.reset();
        }
    });
}
/////////////////// Cheat (credit to Sanjix)
function cheat () {
    const chtCardStorage = {
        'key': 'cheat-counts',
        'get': function(type) {
            const counts = JSON.parse(localStorage?.getItem(this.key)) || {};
            return type ? counts[type] : counts;
        },
        'set': function(type,ele) {
            const counts = chtCardStorage.get();
            counts[type] = ele;
            localStorage.setItem(this.key, JSON.stringify(counts));
        },
        'reset': function() {
            let deck = Object.fromEntries(['clubs', 'diamonds', 'hearts', 'spades'].map(suit => [suit, []]));
            let counts = { deck, plays: [], sums: {}, pile: {} };
            ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'].forEach(card => {
                counts.sums[card] = counts.pile[card] = 0;});
            localStorage.setItem(this.key, JSON.stringify(counts));
            console.log("reset cheat-counts");
        },
      //deck management
        // add player's cards to the deck
        'addDeck': function(suit,card) {
            const counts = chtCardStorage.get();
            const deck = counts.deck;
            if (deck[suit].includes(card)) {}
            else {
                deck[suit] = deck[suit].concat(card);
            }
            localStorage.setItem(this.key, JSON.stringify(counts));
            chtCardStorage.sumDeck();
        },
        // remove player's cards from the deck when played
        'delDeck': function(suit,card) {
            const counts = chtCardStorage.get();
            const deck = counts.deck;
            if (deck[suit].includes(card)) {
                deck[suit].splice(deck[suit].indexOf(card),1);
            }
            localStorage.setItem(this.key, JSON.stringify(counts));
            chtCardStorage.sumDeck();
        },
        // sum up players cards by value
        'sumDeck': function() {
            const counts = chtCardStorage.get();
            const sums = {...Object.fromEntries([...Array(9).keys()].map(i => [i + 2, 0])), "J": 0, "Q": 0, "K": 0, "A": 0 };
            const deck = counts.deck;
            for (const suit in deck) {
                deck[suit].forEach(card => {
                    if (sums.hasOwnProperty(card)) {
                        sums[card]++; } });}
            counts.sums = sums;
            localStorage.setItem(this.key, JSON.stringify(counts));
        },
      //pile management
        // add played cards to the pile (player and npc)
        'addPile': function(cards) {
            const counts = chtCardStorage.get();
            const pile = counts.pile;
            for (const card in cards) {
                pile[card] = pile[card] + cards[card];
            }
            localStorage.setItem(this.key, JSON.stringify(counts));
        },
        // reset the pile
        'delPile': function() {
            const counts = chtCardStorage.get();
            const pile = {...Object.fromEntries([...Array(9).keys()].map(i => [i + 2, 0])), "J": 0, "Q": 0, "K": 0, "A": 0 };
            counts.pile = pile;
            localStorage.setItem(this.key, JSON.stringify(counts));
        },
        // build a p element displaying the pile's contents
        'printPile': function() {
            const counts = chtCardStorage.get();
            const pile = counts.pile;
            var pileContentsP = document.createElement('p');
            pileContentsP.setAttribute("style", "text-align: center; font-size: 10px; margin-block-start: 0px; margin-block-end: 0px;");
            var pileCards = [];
            let keymap = {'2':'Twos', '3':'Threes','4':'Fours', '5':'Fives','6':'Sixes',
                          '7':'Sevens','8':'Eights','9':'Nines','10':'Tens','J':'Jacks',
                          'Q':'Queens','K':'Kings','A':'Aces'};
            for (const card in pile) { if (pile[card] != 0) pileCards += ` ${pile[card]}x ${keymap[card]} |`; }
            pileCards = pileCards.length ? pileCards.substring(0,pileCards.length-2) : " empty";
            pileContentsP.innerHTML = "Pile:" + pileCards;
            return pileContentsP;
        },
      //play management
        // add a play to the log
        'addPlay': function(player, cards, accusedby, innocence, turn, as) {
            const counts = chtCardStorage.get();
            const plays = counts.plays;
            let lastPlayer, lastCards, lastTurn, lastAs;
            if (plays.length > 0) {
                lastPlayer = new String(plays.at(-1).player);
                lastCards = new String(plays.at(-1).cards);
                lastTurn = plays.at(-1).turn ? parseInt(new String(plays.at(-1).turn)) : 1;
                lastAs = plays.at(-1).as ? new String(plays.at(-1).as) : null;
            }
            var tempPlay = new Object;
            tempPlay.player = player ? player : null;
            tempPlay.cards = cards ? cards : null;
            tempPlay.accusedby = accusedby ? accusedby : null;
            tempPlay.innocence = innocence ? innocence : null;
            tempPlay.turn = turn ? 1+turn : 1+lastTurn;
            tempPlay.as = as ? as : lastAs;
            plays.push(tempPlay);
            counts.plays = plays;
            if (plays.length == 1 || (lastPlayer != tempPlay.player && lastCards != tempPlay.cards)) {
            localStorage.setItem(this.key, JSON.stringify(counts)); }
        },
        // edit the most recent play in the log
        'editPlay': function(player, cards, accusedby, innocence, turn, as) {
            const counts = chtCardStorage.get();
            var plays = counts.plays;
            if (plays?.at(-1).player === player && (!plays.at(-1).cards || Object.keys(plays?.at(-1).cards)[0] === Object.keys(cards)[0])) {
                plays.at(-1).player = player;
                plays.at(-1).cards = plays.at(-1).cards ? plays.at(-1).cards : cards;
                plays.at(-1).accusedby = accusedby ? accusedby : null;
                plays.at(-1).innocence = innocence ? innocence : null;
                plays.at(-1).turn = turn ? turn : 1;
                if (plays?.at(-1).player === "You") {
                    let keymap;
                    if (Object.values(plays?.at(-1).cards)[0] === 1) {
                        keymap = {'2':'a Two','3':'a Three','4':'a Four','5':'a Five','6':'a Six',
                                  '7':'a Seven','8':'an Eight','9':'a Nine','10':'a Ten','Jack':'a Jack',
                                  'Queen':'a Queen','King':'a King','Ace':'an Ace'};}
                    else { keymap = {'2':'Twos','3':'Threes','4':'Fours','5':'Fives','6':'Sixes',
                                  '7':'Sevens','8':'Eights','9':'Nines','10':'Tens','Jack':'Jacks',
                                  'Queen':'Queens','King':'Kings','Ace':'Aces'};}
                    console.log("keymap",Boolean(keymap[as]));
                    if (keymap[as]) {plays.at(-1).as = keymap[as];}
                    else { plays.at(-1).as = plays.at(-1).as ? plays.at(-1).as : as; }
                } else { plays.at(-1).as = plays.at(-1).as ? plays.at(-1).as : as; }
            }
            counts.plays = plays;
            localStorage.setItem(this.key, JSON.stringify(counts));
        },
        // build a div element containing the play log
        'printPlay': function() {
            const counts = chtCardStorage.get();
            const plays = counts.plays;
            var exceptLatest = plays.slice(0,plays.length - 1);
            var playHistoryDiv = document.createElement('div');
            let keymap;
            exceptLatest.forEach((play) => {
                let cur = document.createElement('p');
                let oval = Object.values(play.cards)[0];
                if (oval === 1) {keymap = {'2':'Two', '3':'Three','4':'Four', '5':'Five','6':'Six',
                          '7':'Seven','8':'Eight','9':'Nine','10':'Ten','J':'Jack',
                          'Q':'Queen','K':'King','A':'Ace'}}
                    else {keymap = {'2':'Twos', '3':'Threes','4':'Fours', '5':'Fives','6':'Sixes',
                          '7':'Sevens','8':'Eights','9':'Nines','10':'Tens','J':'Jacks',
                          'Q':'Queens','K':'Kings','A':'Aces'}}
                let okey = keymap[Object.keys(play.cards)[0]];
                cur.innerHTML = `Turn ${play.turn}: ` + play.player + ` played <b>${oval}x ${okey}</b>`;
                if (play.player == 'You') {cur.innerHTML += ` passed off as ` + play.as;}
                cur.innerHTML += `.`;
                let pronounObj = play.player == 'You' ? 'you' : 'them';
                let pronounSub = play.player == 'You' ? 'you' : 'they';
                if (play.accusedby) {
                    cur.innerHTML += ' ' + play.accusedby + ' ';
                    if (play.innocence) {
                        cur.innerHTML += 'accused ' + pronounObj + ' but ' + pronounSub + ' weren\'t cheating!';
                    } else {
                        cur.innerHTML += 'caught ' + pronounObj + ' cheating!';
                    }
                } else { cur.innerHTML += ' No one accused ' + pronounObj + ' of cheating.'; }
                playHistoryDiv.prepend(cur); });
            return playHistoryDiv;
        }
    }
    //put the main page text content into a constant for use later
    const chtContent = document.querySelector('#page_content > main')?.textContent;
    //these are various buttons to start playing
    const newGame = document.querySelector('input[value="Play ??"]'); //????????
    const playAgain = document.querySelector('main input[value="Play Again"]');
    const resumePlay = document.querySelector('main input[value="Return to Game"]');
    const nextDiff = document.querySelector('input[value^="Continue to Difficulty"]');
    //button that appears when it is the player's turn to choose cards
    const myTurn = document.querySelector('main input[value="Go!"]');

    //buttons that appear when other players are playing
    const letSlide = document.querySelector('input[value="Let Slide"]');
    const accuseCheat = document.querySelector('input[value="Accuse of Cheating"]');
    const playResolve = document.querySelector('input[value="Click to Continue"]');

    //DOM elements where we will insert our own elements
    const pileP = document.querySelector('#cheat-cast + p'); //pileInt = parseInt(document.querySelector('#cheat-cast + p > b')?.textContent);
    const returnDiv = document.querySelector('#cheat-cast ~ #cards ~ p.center ~ div.button-group');

    //reset if everyone has 13 cards or you can increase your difficulty
    let npcsCardCounts = [...document.querySelectorAll('#cheat-cast .cheat-player b')]?.map(e => +e.textContent),
        myCardCount = +document.querySelector("main > p.center.red + p.center > b")?.textContent;
    if (myCardCount && new Set([...npcsCardCounts, myCardCount, 13]).size === 1) {chtCardStorage.reset();}
    else if (nextDiff) {chtCardStorage.reset();}

    //on window load...
    window.addEventListener("load", (event) => {
        var counts = chtCardStorage.get();
        //if it's the player's turn, put the current hand into deck, reset sums, display known cards
        if (myTurn) {
            let deck = counts.deck;
            let turn = counts.plays.length>0 ? counts.plays.at(-1).turn : 0;
            let as = counts.plays.length>0 ? counts.plays.at(-1).as : null;
            let myHand = [...document.querySelectorAll('#cards div.card img[onclick*="toggle_card"]')].reduce((acc, e) => {
                let [_, num, suit] = /(?<=cards\/)(\d+)(?:_)(spades|hearts|clubs|diamonds)(?:.gif)/.exec(e.src) || [];
                if (num) acc[suit] ||= []; acc[suit].push(num > 10 ? ['J', 'Q', 'K', 'A'][num - 11] || num : num);
                return acc;}, {});
            Object.entries(myHand).forEach(([suit, cards]) => cards.forEach(card => chtCardStorage.addDeck(suit, card)));
            //make a play entry
            chtCardStorage.addPlay("You", null, null, null, turn, as);
            //refresh storage
            counts = chtCardStorage.get();
            //build display elements
            returnDiv.after(chtCardStorage.printPlay());
            pileP.after(chtCardStorage.printPile());
        //if it's someone else's turn to play, record the play, build the pile
        } else if (letSlide || accuseCheat) {
            counts = chtCardStorage.get();
            let turn = counts.plays.at(-1).turn;
            let as = counts.plays.at(-1).as;
            const parsed = document.querySelector('#cards + p strong')?.textContent.match(/(.*?) Played (\d) (\w+)$/);
            const cardMap = { 'Two': '2', 'Twos': '2', 'Three': '3', 'Threes': '3',
                              'Four': '4', 'Fours': '4', 'Five': '5', 'Fives': '5',
                              'Six': '6', 'Sixes': '6', 'Seven': '7', 'Sevens': '7',
                              'Eight': '8', 'Eights': '8', 'Nine': '9', 'Nines': '9',
                              'Ten': '10', 'Tens': '10', 'Jack': 'J', 'Jacks': 'J',
                              'Queen': 'Q', 'Queens': 'Q', 'King': 'K', 'Kings': 'K', 'Ace': 'A', 'Aces': 'A' };
            chtCardStorage.addPlay(parsed[1], {[cardMap[parsed[3]]]: parseInt(parsed[2])}, null, null, turn, as);
            returnDiv.after(chtCardStorage.printPlay());
            chtCardStorage.addPile({[cardMap[parsed[3]]]: parseInt(parsed[2])});
            pileP.after(chtCardStorage.printPile());
            counts = chtCardStorage.get();
        //if it's the accusation resolution screen, manage it
        } else if (playResolve) {
            counts = chtCardStorage.get();
            let tempPlayer = counts.plays.at(-1).player;
            let tempAccuser;
            let tempCards = counts.plays.at(-1).cards;
            let tempTurn = counts.plays.at(-1).turn;
            let tempAs = counts.plays.at(-1).as;
            let petName = document.querySelector("div#userinfo > a[href='/quickref/']").textContent;
            if (chtContent.includes("No one accused")) {
                let noOneAccused = chtContent.match(/No one accused ([\w ]+) of cheating./);
                if (noOneAccused[1] === tempPlayer || noOneAccused[1] === petName) {
                    if (tempPlayer === petName) tempPlayer = "You";
                    chtCardStorage.editPlay(tempPlayer, tempCards, null, null, tempTurn, tempAs);
                }
            } else if (chtContent.match(/caught [\w ]+ cheating/)) {
                let caughtCheating = chtContent.match(/\b(.*) caught (.*?) cheating\b/);
                if (caughtCheating[2] === tempPlayer || caughtCheating[2] === petName) {
                    tempAccuser = caughtCheating[1];
                    if (tempPlayer === petName) tempPlayer = "You";
                    if (tempAccuser === petName) tempAccuser = "You";
                    chtCardStorage.editPlay(tempPlayer, tempCards, tempAccuser, false, tempTurn, tempAs);
                    chtCardStorage.delPile();
                }
            } else if (chtContent.includes("was NOT CHEATING!!")) {
                let wasNotCheating = chtContent.match(/([\w ]+) accused ([\w ]+) of cheating,/);
                if (wasNotCheating[2] === tempPlayer || wasNotCheating[2] === petName) {
                    tempAccuser = wasNotCheating[1];
                    if (tempPlayer === petName) tempPlayer = "You";
                    if (tempAccuser === petName) tempAccuser = "You";
                    chtCardStorage.editPlay(tempPlayer, tempCards, tempAccuser, true, tempTurn, tempAs);
                    chtCardStorage.delPile();
                }
            }
        }
    });
    //when the player submits their turn, remove the selected cards from their deck, add them to the pile, and edit the play entry
    myTurn?.addEventListener("click", (event) => {
        var counts = chtCardStorage.get();
        let mhPlayed = document.querySelector('input[id="cards_input"]')?.value;
        let turn = counts.plays.at(-1).turn ? counts.plays.at(-1).turn : 1;
        let asDropdown = document.querySelector('select[name="card_type"]')?.value;
        let tempCards = {};
        document.querySelector('input[id="cards_input"]')?.value.split(",").forEach( card => {
            let parse = card.match(/(\d+)(?:_)(spades|hearts|clubs|diamonds)/);
            let face = parse[1] > 10 ? ['J', 'Q', 'K', 'A'][parse[1] - 11] || parse[1] : parse[1];
            chtCardStorage.delDeck(parse[2], face);
            tempCards[face] = tempCards[face] ? 1+tempCards[face] : 1; });
        chtCardStorage.addPile(tempCards);
        chtCardStorage.editPlay("You", tempCards, null, null, turn, asDropdown);
    });
}
/////////////////// Grumpy/Wise King Avatar Selections
function gwKing () {
    $("[onclick='generateJoke()']").trigger("click");
    const questions = ['What','do','you do if','*Leave blank*','fierce','Grundos','*Leave blank*','has eaten too much',
                       '*Leave blank*','tin of olives'].forEach((value, index) => {$(`#question${index + 1}`).val(value);});
    $('#wisdom6').val('nugget');
}
/////////////////// FC Bet Count (inspired by Senerio)
function fcBetCount () {
    const fcBetCount = document.querySelectorAll('div[name="fc_bet_info"]').length;
    $('div.bg-darkred').text(`Current Bets (${fcBetCount})`);
}
/////////////////// Lottery Ticket Generator (inspired by neoquest_guide)
async function lotteryTicketNumbers () {
    const ticketStorage = 'ticket-numbers';
    const getTicketNumbers = async () => {
        return JSON.parse(await GM.getValue(ticketStorage, '{}'));
    }
    var ticketNumbers = await getTicketNumbers();

    function setBallValues (numberArray) {
        document.querySelectorAll("div[class*='ball'] input[maxlength='2']").forEach((ball, index) => {
            ball.value = numberArray[index];
        });
    }

    let nthTicket = 0;
    if (document.querySelector("div[class='flex-column small-gap']").innerText.includes("why not buy one")) {
        generateNewTicketValues(20);
        ticketNumbers = await getTicketNumbers();
        console.log("new tickets:", ticketNumbers);
        setBallValues(ticketNumbers[0]);
    } else if (document.querySelector("div[class='flex-column small-gap']").textContent.split("Ticket").length) {
        nthTicket = document.querySelector("div[class='flex-column small-gap']").textContent.split("Ticket").length - 1;
    }
    if (nthTicket < 20) {
        console.log("we need to purchase ticket number "+(nthTicket+1)+" with numbers: "+ticketNumbers[nthTicket]);
        setBallValues(ticketNumbers[nthTicket]);
    } else {
        console.log("daily ticket limit reached");
    }

    // following source code from
    // https://www.andrew.cmu.edu/user/kmliu/neopets/lottery2.html
    function generateNewTicketValues (ticketsNeeded) {
        var arr = new Array();
        for (var i=0; i<30; i++) {arr[i] = i+1;}
        let arr1, arr2, arr3, arr4, marr;
        arr1 = shuffle(arr);
        arr2 = leaf( arr1.slice(0,15), arr1.slice(15,30) );
        arr2 = leaf( arr2.slice(0,15), arr2.slice(15,30) );
        arr3 = leaf( arr2.slice(0,15), arr2.slice(15,30) );
        arr3 = leaf( arr3.slice(0,15), arr3.slice(15,30) );
        arr4 = leaf( arr3.slice(0,15), arr3.slice(15,30) );
        arr4 = leaf( arr4.slice(0,15), arr4.slice(15,30) );
        marr = arr1.concat(arr2,arr3,arr4);

        var newTickets = new Array();
        for (i=0; i<ticketsNeeded; i++) {
            let temp = [];
            for (var j=0; j<6; j++) {
                temp.push(marr[6*i+j]);
            }
            temp.sort((a, b) => a - b);
            newTickets.push(temp);
        }
        console.log("generated "+ ticketsNeeded +" tickets");
        GM.setValue(ticketStorage, JSON.stringify(newTickets));
    }

    function shuffle (o) {
        for (var j, x, z = o.length; z; j = Math.floor(Math.random() * z), x = o[--z], o[z] = o[j], o[j] = x);
        return o;
    };
    function leaf (a,b) {
        var res = new Array();
        for(var k=0; k<a.length; k++) {
            res[k*2] = a[k];
            res[k*2+1] = b[k];
        }
        return res;
    };
}
///////////////////
///////////////////
///////////////////
///////////////////
//references:
  // Z: https://greasyfork.org/en/users/1257536-zzzzzooted
    // https://greasyfork.org/en/scripts/486718-gc-questing-keyboard-controls/code
    // https://greasyfork.org/en/scripts/499855-gc-bd-keyboard-mapping/code
  // Dij: https://greasyfork.org/en/users/1272286-wreckstation
    // https://greasyfork.org/en/scripts/499878-grundos-cafe-battledome-full-keyboard-controls/code
    // https://greasyfork.org/en/scripts/497481-grundos-cafe-snow-wars-keyboard-controls/code
    // https://greasyfork.org/en/scripts/489417-grundos-cafe-dice-a-roo-and-gormball-keyboard-controls/code
  // Kait: https://greasyfork.org/en/users/1225524-kaitlin
    // https://greasyfork.org/en/scripts/483608-gc-bilge-dice-keyboard-controls-tracking-enhancements/code
    // https://greasyfork.org/en/scripts/487357-gc-kiss-the-mortog-keyboard-controls/code
    // https://greasyfork.org/en/scripts/489543-gc-scorchy-slots-keyboard-mapping/code
    // https://greasyfork.org/en/scripts/487432-gc-beta-dailies-global-preferences-wizard/code
    // https://greasyfork.org/en/scripts/495558-gc-snow-wars-enhancements/code
  // Shiba: https://greasyfork.org/en/users/1340979-shibashiba
    // https://greasyfork.org/en/scripts/503746-shiba-s-pyramids-card-counter/code
  // Senerio: https://github.com/senerio
    // https://github.com/senerio/neopets-userscripts/blob/main/fcbetcount.user.js
  // neoquest_guide: https://neoquest.guide/userscripts/
    // https://neoquest.guide/userscripts/lottery.user.js
  // Sanjix: https://greasyfork.org/en/users/1175371-sanjix
    // https://greasyfork.org/en/scripts/485673-gc-scratchcard-keyboard-controls/code
    // https://greasyfork.org/en/scripts/475636-gc-tyranu-evavu-tracker/code
    // https://greasyfork.org/en/scripts/475552-gc-tyranu-evavu-keyboard-controls/code
    // https://greasyfork.org/en/scripts/507890-gc-cheat-helper/code
    // https://greasyfork.org/en/scripts/508053-gc-cheat-keyboard-controls/code
//to add:
  // Sanjix: https://greasyfork.org/en/users/1175371-sanjix
    // https://greasyfork.org/en/scripts/489924-gc-guess-the-card-keyboard-controls-test/code
    // https://greasyfork.org/en/scripts/489923-gc-double-or-nothing-keyboard-controls/code
    // https://greasyfork.org/en/scripts/485527-gc-pick-your-own-keyboard-controls/code
    // https://greasyfork.org/en/scripts/486716-gc-shop-till-withdraw-keyboard-shortcut/code
// Thank you all!! -mox
///////////////////
