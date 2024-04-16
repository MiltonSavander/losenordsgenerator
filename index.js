window.onload = function () {
    //slider
    const slider = document.querySelector("input.slider");
    let lengthNum = document.querySelector("div.length-num-box");

    //checkboxes
    const checkboxes = document.getElementsByClassName("checkboxs");
    const incUpper = document.getElementById("inc-uppercase");
    const incLower = document.getElementById("inc-lowercase");
    const incNumber = document.getElementById("inc-numbers");
    const incSymbol = document.getElementById("inc-symbols");

    //bars
    const bars = document.getElementsByClassName("bar")
    const bar1 = document.getElementById("bar1");
    const bar2 = document.getElementById("bar2");
    const bar3 = document.getElementById("bar3");
    const bar4 = document.getElementById("bar4");

    //buttons
    const generate = document.getElementById("generate-button");
    const copyButton = document.getElementById("image-button");

    //characters
    const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_+=?/.,;:`~|[]{}";

    //strength text
    const strengthText = document.getElementById("strength-indicator-text");

    //generated password
    const password = document.getElementById("password");

    //slider graphics
    lengthNum.innerHTML = slider.value;

    slider.oninput = function () {
        lengthNum.innerHTML = this.value;
        if (this.value < minimumValue()) {
            lengthNum.innerHTML = minimumValue();
        }
    };

    for (let box of checkboxes) {
        box.addEventListener("click", function () {
            const inputEvent = new Event("input", { bubbles: true });
            slider.dispatchEvent(inputEvent);
        });
    }

    //slider minimum value
    slider.addEventListener("input", function () {
        if (slider.value < minimumValue()) {
            slider.value = minimumValue();
        }
    });

    slider.addEventListener("input", function () {
        let x = slider.value * 5 - 1;
        let color = `linear-gradient(90deg, #A638F6 ${x}%, #2a2438 ${x}%)`;
        slider.style.background = color;
    });

    //get minimum value for slider
    function minimumValue() {
        let checkboxList = [
            "inc-uppercase",
            "inc-lowercase",
            "inc-numbers",
            "inc-symbols",
        ];
        let checkedCount = 0;
        for (let i of checkboxList) {
            if (document.getElementById(i).checked) {
                checkedCount++;
            }
        }
        return checkedCount;
    }

    function turnBarOff(bar) {
        bar.style.border = "solid #ffffff 1px";
        bar.style.background = "#A638F6";
    }

    function turnBarOn(bar, color) {
        bar.style.border = `solid ${color} 1px`;
        bar.style.background = color;
    }


    function calculateStrength() {
        let score = 0;
        score = password.textContent.length;
        if (incUpper.checked) score += 1;
        if (incLower.checked) score += 1;
        if (incNumber.checked) score += 1;
        if (incSymbol.checked) score += 1;
        return score
    }

    function getRandomIndex(item) {
        return Math.floor(Math.random() * item.length);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function generatePassword(lengthNum) {
        let startList = [];
        let optionList = [];

        if (incUpper.checked) {
            startList.push(upperLetters[getRandomIndex(upperLetters)]);
            optionList.push(upperLetters);
        }
        if (incLower.checked) {
            startList.push(lowerLetters[getRandomIndex(lowerLetters)]);
            optionList.push(lowerLetters);
        }
        if (incNumber.checked) {
            startList.push(numbers[getRandomIndex(numbers)]);
            optionList.push(numbers);
        }
        if (incSymbol.checked) {
            startList.push(symbols[getRandomIndex(symbols)]);
            optionList.push(symbols);
        }
        if (optionList.length === 0) {
            return "ಠ_ಠ";
        }
        for (let i = 0; i < lengthNum - optionList.length; i++) {
            const randomOptionIndex = getRandomIndex(optionList);
            const randomOption = optionList[randomOptionIndex];
            const randomcharacterIndex = getRandomIndex(randomOption);
            const randomcharacter = randomOption[randomcharacterIndex];
            startList.push(randomcharacter);
        }
        return shuffleArray(startList).join("");
    }

    //generate password
    generate.addEventListener("click", function () {
        const originalString = generatePassword(slider.value);
        const rawString = String.raw`${originalString}`;

        password.innerHTML = rawString;

        let score = calculateStrength();

        if (score <= 10) {
            strengthText.innerHTML = "Feeble";
            turnBarOn(bar1, "#910000");
            turnBarOff(bar2);
            turnBarOff(bar3);
            turnBarOff(bar4);
        } else if (score <= 12) {
            strengthText.innerHTML = "Weak";
            turnBarOn(bar1, "#ff0101");
            turnBarOn(bar2, "#ff0101");
            turnBarOff(bar3);
            turnBarOff(bar4);
        } else if (score <= 14) {
            strengthText.innerHTML = "Medium";
            turnBarOn(bar1, "#ffa257");
            turnBarOn(bar2, "#ffa257");
            turnBarOn(bar3, "#ffa257");
            turnBarOff(bar4);
        } else if (score > 14) {
            strengthText.innerHTML = "Great";
            turnBarOn(bar1, "#4ABEA0");
            turnBarOn(bar2, "#4ABEA0");
            turnBarOn(bar3, "#4ABEA0");
            turnBarOn(bar4, "#4ABEA0");
        }
    });




    //copy to clipboard
    copyButton.addEventListener("click", function () {
        const passwordToCopy = password.textContent;
        navigator.clipboard.writeText(passwordToCopy)
        alert("Password copied to clipboard!")
    });
}

