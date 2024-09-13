// ==UserScript==
// @name         GC Keyboard Controls Bundle ALPHA
// @namespace    grundos-cafe
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grundos.cafe
// @version      0.4
// @description  Adds keyboard controls around GC
// @author       Z & Dij & Berna & Kait & mox
// @match        https://www.grundos.cafe/faerieland/employ/*
// @match        https://www.grundos.cafe/faerieland/darkfaerie/*
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
// @match        https://www.grundos.cafe/games/bilgedice/*
// @match        https://www.grundos.cafe/games/*slots/*
// @match        https://www.grundos.cafe/medieval/kissthemortog/
// @match        https://www.grundos.cafe/dome/1p/*battle/
// @match        https://www.grundos.cafe/adopt/*
// @license      MIT
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==

// choose your Gormball player and preferred wait time
const gormPlayer = 1; //1=Thyassa, 2=Brian, 3=Gargarox, 4=Farvin III, 5=Ember, 6=COOL Zargrold, 7=Ursula, 8=Kevin
const gormWait = 1; //  1-5 (in seconds), 1 is default

// choose your Kiss The Mortog alert: 100, 300, 1150, 5900 [avatar], 35000, 250000, 2000000, 18000000
const mortogLimit = 5900;
// put "first" or "last" to choose only the first or last mortogs that appear in line
 // by default, a random (by computing standards) mortog will be chosen each time
const mortogFavorite = "random"; // "random"; "first"; "last";

// choose your Bilge Dice ante; if you haven't yet unlocked the option you select, you will bet 10 NP
const bilgeAnteAmount = 10; // choose from below values, all are in NP
const bilgeAnteChoices = [ 10, 50, 100, 200, 500, 1000 ];

// if you want number keys 1,2,3,etc to map to the same quest locations every time,
 // toggle the override to 'true' and arrange the location URLs to your liking
 // you may also delete a link, or skip a number key
// otherwise, the keys map to the locations in the order of your sidebar and update dynamically
 // (e.g. esophagor button goes away when time to go to brain tree, no faerie quest button unless you have one)
// NB: you can only navigate between the quest pages in this way from other quest pages in this list

const questSidebarOverride = false; //const questSidebarOverride = true;
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

//initialize kait's Bilge Dice, KTM, SS enhancements
if (location.pathname.match(/bilgedice/)) bilgeDice();
if (location.pathname.match(/kissthemortog/)) kissTheMortog();
if (location.pathname.match(/slots/)) scorchySlots();

 window.addEventListener("keydown", (event) => {
     if(event.target.matches("input[type='text']")) {return;} //if entering text in a text box, don't record keydown event
     let arrowKeyCount = 0;
     let digitKeyCount = 0; //initialize some useful variables
        switch (event.code) {
			case "Space":
                event.preventDefault(); 
			    if (location.pathname.match(/bilgedice\/play/)) {
                    bilgeDice('Space'); break; //prevent fall-through when playing Bilge Dice since Space is used differently
                } else if (location.pathname.match(/slots/)) {
                    scorchySlots('Space'); break; //prevent fall-through when playing Scorchy Slots since Space is used differently
                } //falls through so Space can be used like Enter
            case "Enter": //falls through so either Enter key can be used interchangeably
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
					else {window.location.reload();} //refresh failed quest
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
                } else if (location.pathname.match(/bilgedice/)) { bilgeDice('Enter');
				} else if (location.pathname.match(/kissthemortog/)) {kissTheMortog('Enter');
                } else if (location.pathname.match(/slots/)) {scorchySlots('Enter');
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
                if (location.pathname.match(/halloween|island|winter/) && questSidebarOverride && typeof questOverrideActions[digitKeyCount] != 'undefined') {
					let keyCheck = parseInt(Object.keys(questOverrideActions[digitKeyCount])) - 1;
                    if (digitKeyCount === keyCheck) window.location.assign(location.origin + Object.values(questOverrideActions[digitKeyCount]).toString());
                    else {console.log("Your quest order settings are incorrect, please check them!"); break;}
				} else if (location.pathname.match(/halloween|island|winter/) && !questSidebarOverride && digitKeyCount < document.querySelector(`div#aio_sidebar > .quests > .aioImg`).childElementCount) {
                    let rankOrderDiv = document.querySelectorAll('.quests .aioImg div');
                    let rankOrderList = Array.prototype.slice.call(rankOrderDiv).sort((a, b) => {
                        var aOrder = a.getAttribute('style').match(/order:(\d+)/)[1]; var bOrder = b.getAttribute('style').match(/order:(\d+)/)[1]; if (aOrder > bOrder) return 1; if (aOrder < bOrder) return -1; return 0;})
                    $(rankOrderList[digitKeyCount].firstChild.click());
                } else if (location.pathname.match(/halloween|island|winter/) && questSidebarOverride && typeof questOverrideActions[digitKeyCount] == 'undefined') { console.log("You didn't assign anything to that key.");
                } else if (location.pathname.match(/bilgedice/)) {
					bilgeDice(digitKeyCount);
				} else if (location.pathname.match(/slots/)) {
					scorchySlots(digitKeyCount);
				} break;
        }
 });
 
/////////////////// Bilge Dice (by Cupkait)
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
/////////////////// Kiss The Mortog (by Cupkait)
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
/////////////////// Scorchy Slots (by Cupkait)
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
        let tempWinSession = parseInt(/(?<=gs: )([\d,-]+)(?= NP)/.exec(ssWinnings.session)[0].replace(/,/g, ""));
        let tempWinTotal = parseInt(/(?<=gs: )([\d,-]+)(?= NP)/.exec(ssWinnings.total)[0].replace(/,/g, ""));
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
            let tempSessionWinnings = parseInt(/(?<=gs: )([\d,-]+)(?= NP)/.exec(ssWinnings.session)[0].replace(/,/g, ""));
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
        reNP = randEvent?.innerText?.match(/([\d,]+)(?= N?n?eopoints| NP| np)/)[0]?.replace(/,/g, "");
        if (reNP) {
            if (/gives you|[Ff]+ortune|[Tt]+reasure|spilled/.test(randEvent.innerText)) {}
            else if (/steal|appropriate|take|lose/.test(randEvent.innerText)) reNP = 0-reNP;
            return reNP;
        }
    }
}
