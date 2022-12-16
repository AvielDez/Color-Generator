/******Data Points used */
//data.hex.value - returns the hexacode value for the colors
//data.hex.clean - returns the hexacode value for the colors without '#'
//data.name.value - returns a generated name for the color
//data.contrast.value - returns either #ffffff/(white) or #000000/(black)

function getArrayOfRandomNum(amount){
    let arrayOfRandomNum = []
    for(let i = 0; i < amount; i++){
        arrayOfRandomNum.push(Math.floor(Math.random() * 16)) 
    }
    return arrayOfRandomNum 
}

function getRandomHexColor(){
    let arrayOfNum = getArrayOfRandomNum(6)
    for(let i = 0; i < arrayOfNum.length; i++){
        if(arrayOfNum[i] === 10){
            arrayOfNum[i] = 'a'
        }
        else if(arrayOfNum[i] === 11){
            arrayOfNum[i] = 'b'
        }
        else if(arrayOfNum[i] === 12){
            arrayOfNum[i] = 'c'
        }
        else if(arrayOfNum[i] === 13){
            arrayOfNum[i] = 'd'
        }
        else if(arrayOfNum[i] === 14){
            arrayOfNum[i] = 'e'
        }
        else if(arrayOfNum[i] === 15){
            arrayOfNum[i] = 'f'
        }
    }
    return arrayOfNum.join('')
}

function getRandomColorMethod(){
    const arrayOfColorMethod = ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement', 'triad']
    return arrayOfColorMethod[Math.floor(Math.random() * 7)]
}

function checkContrast(data){
    return data === '#ffffff' ? '#f5f5f5' : '#2b2b2b'
}

function getGradient(){
    let gradientString = ''
    for(let i = 0; i < arrayOfColors.length - 1; i++){
        gradientString += `${arrayOfColors[i].hex}, `
    }
    gradientString += `${arrayOfColors[arrayOfColors.length - 1].hex}`
    modalGradientContainer.style.background = `linear-gradient(${gradientString})`
}

function getColorPallet(hex, method, count){
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${method}&count=${count}`,)
    .then(response => response.json())
    .then(data => {
        //Pushes the fetched data into the 'arrayOfColors' for easy access throughout the code base
        setArrayOfColors(data)
        //Inserts colors to current main color pallet
        getColorPalletHtml()
        generateMainCopyButtons()
        //Inserts color pallet to bottom of modal
        getModalColorPalletHtml()
         //Generates Buttons for the conversions modal
        generateModalColorButtons()
        //Inserts gradient into gradient modal based on current pallet
        getGradient()
    }) 
}

function setArrayOfColors(data){
    data.colors.map(color=>{
        arrayOfColors.push({
            name: color.name.value,
            contrast: color.contrast.value,
            hex: color.hex.value,
            hexClean: color.hex.clean,
            rgb: {
                value: color.rgb.value,
                r: color.rgb.r,
                g: color.rgb.g,
                b: color.rgb.b,
            },
            hsl: {
                value: color.hsl.value,
                h: color.hsl.h,
                s: color.hsl.s,
                l: color.hsl.l
            },
            hsv: {
                value: color.hsv.value,
                h: color.hsv.h,
                s: color.hsv.s,
                v: color.hsv.v
            },
            cmyk: {
                value: color.cmyk.value,
                c: color.cmyk.c,
                m: color.cmyk.m,
                y: color.cmyk.y,
                k: color.cmyk.k,
            },
            XYZ: {
                value: color.XYZ.value,
                X: color.XYZ.X,
                Y: color.XYZ.Y,
                Z: color.XYZ.Z,
            }
        })
    })
}

function getColorPalletHtml(){
    let colorSpacing = 100 / countOfColors
    let colorHtml = ''
    arrayOfColors.map(color =>{
        colorHtml += `
        <div class="color" style="height: ${colorSpacing}%; background-color: ${color.hex};">
            <div class="color-info" style="color: ${checkContrast(color.contrast)};">
                <div class="color-hex">${color.hexClean}</div>
                <div class="color-name">${color.name}</div>
            </div>
            <svg data-hex="${color.hex}" class="copy-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="${checkContrast(color.contrast)}"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
        </div>
    `
    })
    colorContainer.innerHTML = colorHtml
}

function getModalColorInfoHtml(colorId){
    const color = arrayOfColors[colorId]
    modalConversionsContainer.innerHTML = `
        <div class="modal-conversion" style="color: ${checkContrast(color.contrast)}" data-info="${color.hex}">
            <h1 class="conversion-type">HEX</h1>
            <div class="flex">
                <p class="color-code">${color.hexClean}</p>
                <p class="modal-copied-message">copy</p>
            </div>
        </div>
        <div class="modal-conversion" style="color: ${checkContrast(color.contrast)}" data-info="${color.rgb.value}">
            <h1 class="conversion-type">RGB</h1>
            <div class="flex">
                <p class="color-code">${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}</p>
                <p class="modal-copied-message">copy</p>
            </div>
        </div>
        <div class="modal-conversion" style="color: ${checkContrast(color.contrast)}" data-info="${color.hsl.value}">
            <h1 class="conversion-type">HSL</h1>
            <div class="flex">
                <p class="color-code">${color.hsl.h}, ${color.hsl.s}, ${color.hsl.l}</p>
                <p class="modal-copied-message">copy</p>
            </div>
        </div>
        <div class="modal-conversion" style="color: ${checkContrast(color.contrast)}" data-info="${color.hsv.value}">
            <h1 class="conversion-type">HSV</h1>
            <div class="flex">
                <p class="color-code">${color.hsv.h}, ${color.hsv.s}, ${color.hsv.v}</p>
                <p class="modal-copied-message">copy</p>
            </div>
        </div>
        <div class="modal-conversion" style="color: ${checkContrast(color.contrast)}" data-info="${color.cmyk.value}">
            <h1 class="conversion-type">CMYK</h1>
            <div class="flex">
                <p class="color-code">${color.cmyk.c}, ${color.cmyk.m}, ${color.cmyk.y}, ${color.cmyk.k}</p>
                <p class="modal-copied-message">copy</p>
            </div>
        </div>
        <div class="modal-conversion" style="color: ${checkContrast(color.contrast)}" data-info="${color.XYZ.value}">
            <h1 class="conversion-type">XYZ</h1>
            <div class="flex">
                <p class="color-code">${color.XYZ.X}, ${color.XYZ.Y}, ${color.XYZ.Z}</p>
                <p class="modal-copied-message">copy</p>
            </div>
        </div>
        <div class="modal-conversion" style="color: ${checkContrast(color.contrast)}" data-info="${color.name}">
            <h1 class="conversion-type">NAME</h1>
            <div class="flex">
                <p class="color-code">${color.name}</p>
                <p class="modal-copied-message">copy</p>
            </div>
        </div>
    `
    modalConversionsContainer.style.backgroundColor = color.hex
}

function getModalColorPalletHtml(){
    let modalColorPalletHtml = ''
    let colorPalletId = 0
    arrayOfColors.map(color=>{
        modalColorPalletHtml += `
        <div class="modal-color-pallet-color" data-color-id="${colorPalletId}" style="background-color: ${color.hex};">
            <div class="modal-color-pallet-dot"></div>
        </div>
        `
        colorPalletId++
    })
    modalColorPalletContainer.innerHTML =  modalColorPalletHtml
}

function generateMainCopyButtons(){
    const mainCopyButtons = document.querySelectorAll('[data-hex]')
    mainCopyButtons.forEach(copyButton =>{
        copyButton.addEventListener('click', handleMainCopy)
    })  
}

function handleMainCopy(event){ 
    navigator.clipboard.writeText(event.currentTarget.dataset.hex)
    getCopiedMessage()
}

function generateModalCopyButtons(){
    const modalCopyButtons = document.querySelectorAll('[data-info]')
    modalCopyButtons.forEach(copyButton =>{
        copyButton.addEventListener('click', handleModalCopy)
    }) 
}

function handleModalCopy(event){
    navigator.clipboard.writeText(event.currentTarget.dataset.info)
    getCopiedMessage()
}

function generateModalColorButtons(){
    const modalColorButtons = document.querySelectorAll('[data-color-id]')
    modalColorButtons.forEach(colorButton =>{
        colorButton.addEventListener('click', handleColorInfo)
    }) 
}

function handleColorInfo(event){
    getModalColorInfoHtml(Number(event.target.dataset.colorId))
    let selectedDots = document.querySelectorAll('.modal-color-pallet-dot')
    for(let i = 0; i < selectedDots.length; i++){
        selectedDots[i].classList.remove('modal-color-pallet-dot-active')
    }
    event.target.children[0].classList.add('modal-color-pallet-dot-active')
    generateModalCopyButtons()
}

function getCopiedMessage(){
    if(isWaiting){
        document.getElementById('copied-message').classList.toggle('display-none')
        isWaiting = false
        setTimeout(()=>{
            document.getElementById('copied-message').classList.toggle('display-none')
            isWaiting = true
        }, 1200)  
    }
}

function getColorMethod(){
    const colorMethodList = document.getElementById('color-method')
    const colorMethodValue = colorMethodList.options[colorMethodList.selectedIndex].value
    return colorMethodValue
}

function closeMenu(){
    sideMenuId.classList.toggle('slide-in')
    setTimeout(()=>{
        sideMenuId.classList.toggle('display-none')
        invisibleMenu.classList.toggle('display-none')
        sideMenuId.classList.toggle('slide-in')
    }, 300)
    isMenuClosed = true
}

//Access to current main color pallet
const colorContainer = document.getElementById('color-container')

//Access to Menu
const sideMenuId = document.getElementById('side-menu')
const invisibleMenu = document.getElementById('invisible-menu')
const modalConversion = document.getElementById('modal-conversions')

//Access to modal conversions 
const modalConversionsClosed = document.getElementById('modal-conversions-closed')
const modalConversionsContainer = document.getElementById('modal-conversions-container')
const modalColorPalletContainer = document.getElementById('modal-color-pallet-container')
const modalInvisibleMenu = document.getElementById('modal-invisible-menu')

//Access to modal gradient
const modalGradient = document.getElementById('modal-gradient')
const modalGradientContainer = document.getElementById('modal-gradient-container')

let arrayOfColors = []
let isWaiting = true
let isMenuClosed = true


const countOfColors = 5

getColorPallet(getRandomHexColor(), getRandomColorMethod(), countOfColors)

document.body.addEventListener('click', (event)=>{
    if(event.target.id === 'generate-btn'){
        arrayOfColors.length = 0
        let colorPickerValue = document.getElementById("side-color-picker").value
        colorPickerValue = colorPickerValue.split('')
        colorPickerValue.shift()
        colorPickerValue = colorPickerValue.join('')
        getColorPallet(colorPickerValue, getColorMethod(), countOfColors)
    }
    else if(event.target.id === 'random-btn'){
        arrayOfColors.length = 0
        getColorPallet(getRandomHexColor(), getRandomColorMethod(), countOfColors) 
    }

    else if(event.target.dataset.menu === 'side'){
        if(isMenuClosed){
            sideMenuId.classList.toggle('display-none')
            invisibleMenu.classList.toggle('display-none')
            isMenuClosed = false
        }
        else if(!isMenuClosed){
            closeMenu() 
        } 
    }

    else if(event.target.id === 'side-btn-conversion'){
        closeMenu()
        getModalColorInfoHtml(0) 
        generateModalCopyButtons()
        setTimeout(()=>{
            modalConversion.classList.toggle('display-none')
            modalInvisibleMenu.classList.toggle('display-none')
        }, 300) 
    }

    else if(event.target.id === 'btn-conversion'){
        getModalColorInfoHtml(0) 
        generateModalCopyButtons()
        modalConversion.classList.toggle('display-none')
        modalInvisibleMenu.classList.toggle('display-none')
    }

    else if(event.target.id === 'modal-conversions-closed'){
        modalConversion.classList.toggle('display-none')
        modalInvisibleMenu.classList.toggle('display-none')
    }

    else if (event.target.id === 'side-btn-gradient'){
        closeMenu()
         setTimeout(()=>{
            modalGradient.classList.toggle('display-none')
            modalInvisibleMenu.classList.toggle('display-none')
        }, 300) 
    }

    else if (event.target.id === 'btn-gradient'){
        modalGradient.classList.toggle('display-none')
        modalInvisibleMenu.classList.toggle('display-none')
    }

    else if(event.target.id === 'modal-gradient-closed'){
        modalGradient.classList.toggle('display-none')
        modalInvisibleMenu.classList.toggle('display-none')
    }
})
/*
CONSIDER USING THIS FORMAT FOR FUTURE USE WHEN ADDING THE 'SAVE COLOR PALLET' FEATURE. 
TO CALL THIS FUNCTION AND OTHER FUNCTIONS IN THIS FORMAT WILL NEED AN ARRAY 
IN ORDER TO WORK WHICH WILL COME IN HANDY WHEN WE HAVE THE ARRAY FROM THE FETCH REQUEST VS SAVED USER 
COLOR PALLETS ARRAY/DATA

function getColorPalletHtml(array){
    let numOfCurrentColors = 0
    let colorSpacing = 100 / countOfColors
    let colorHtml = ''
    array.map(color =>{
        colorHtml += `
        <div class="color" style="height: ${colorSpacing}%; background-color: ${color.hex};">
            <div class="color-info" style="color: ${checkContrast(color.contrast)};">
                <div class="color-hex">${color.hexClean}</div>
                <div class="color-name">${color.name}</div>
            </div>
            <svg data-num="${numOfCurrentColors}" class="copy-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="${checkContrast(color.contrast)}"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
        </div>
    `
    })
    numOfCurrentColors++
    return colorHtml
} */