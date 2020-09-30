//Fungsi loadApi dengan kombinasi fetch + async await.
async function loadApi(url) {
    return (await fetch(url)).json()
}

/*
    1. Fetch API untuk dapat daftar kabupaten saat value select provinsi berubah dengan event change.
    2. Clear list option sebelumnya sebelum melakukan loop.
    3. Loop response untuk ditampilkan menjadi list option di input select kabupaten.
*/
async function getKabupaten(provinsi) {

    const loading = document.querySelector(".loading")
    loading.classList.remove("hidden")

    reset()

    let selectedProvinsi = provinsi.options[provinsi.selectedIndex].value

    try {

        kabupaten = await loadApi(`https://kodepos-2d475.firebaseio.com/list_kotakab/${selectedProvinsi}.json`)

        const selectKabupaten = document.querySelector("#kabupaten")
        selectKabupaten.innerHTML = ''

        const topOption = document.createElement('option')
        topOption.appendChild(document.createTextNode('2. Pilih kota/kabupaten'))
        selectKabupaten.appendChild(topOption)

        Object.keys(kabupaten).forEach(key => {
            const newOption = document.createElement('option')
            let optionText = document.createTextNode(kabupaten[key])

            // set option text
            newOption.appendChild(optionText)
            // and option value
            newOption.setAttribute('value', key)
            // add the option to the select box
            selectKabupaten.appendChild(newOption)
        })

        loading.classList.add("hidden")

    } catch(e) {
        console.log(e)
    }
}

/*
    1. Ambil data kabupaten dari api dan grouping berdasarkan kode pos
    2. Group data berdasarkan kode pos
*/
async function groupingKodepos() {

    const selectKabupaten = document.querySelector("#kabupaten")

    let selectedKabupaten = selectKabupaten.options[selectKabupaten.selectedIndex].value
    let kabupaten = await loadApi(`https://kodepos-2d475.firebaseio.com/kota_kab/${selectedKabupaten}.json`)

    return kabupaten.reduce(
        (entryMap, e) => entryMap.set(e.kodepos, [...entryMap.get(e.kodepos)||[], e]),
        new Map()
    )
}

/*
    1. Fetch API untuk dapat daftar kodepos yang sudah dikelompokan dari function groupKodepos().
    2. Kodepos disorting lalu dilooping
*/
async function getKodePosRange() {
    
    reset()

    try {

        const groupKodepos = await groupingKodepos().then(result => {return result})
        const sortKodepos = new Map([...groupKodepos.entries()].sort())
        
        let allKodePos = ''
        for (let key of sortKodepos.keys()) {
            allKodePos += `<div class="flex">
                <button class="w-2/3 bg-gray-100 py-1 font-semibold focus:outline-none" onclick="showDetail(this)">${key}</button>
                <button onclick="copy(this)" onmouseout="tooltip()" class="w-1/3 bg-green-200 pb-1 focus:outline-none tooltip">
                    <ion-icon name="copy" class="text-xl text-green-500"></ion-icon>
                </button>
            </div>`
        }
        
        const kodePos = document.querySelector("#kodePos")
        kodePos.parentNode.classList.remove("hidden")
        kodePos.innerHTML = allKodePos

    } catch(e) {
        console.log(e)
    }
}

async function showDetail(kodepos) {

    try {
        const groupKodepos = await groupingKodepos().then(result => {return result})
        let byKodepos = groupKodepos.get(kodepos.innerText)
        let allKelurahan = ''

        Object.keys(byKodepos).forEach(key => {
            allKelurahan += `<div class="flex justify-between rounded bg-white bg-green-200 mb-2">
                <div class="p-4">
                    <p class="text-green-800 text-lg font-semibold uppercase">${byKodepos[key].kelurahan}</p>
                    <p class="text-green-700">Kode pos <strong>${byKodepos[key].kodepos}</strong> untuk daerah Kelurahan <strong>${byKodepos[key].kelurahan}</strong>, Kecamatan <strong>${byKodepos[key].kecamatan}</strong>.</p>
                </div>
                <a href="https://google.com/search?q=${byKodepos[key].kelurahan}+${byKodepos[key].kecamatan}" target="_blank" class="bg-gray-800 p-5 text-green-200 leading-10 text-center rounded">
                    <ion-icon name="logo-google" class="pb-1"></ion-icon> Search
                </a> 
            </div>`
        })

        const listKelurahan = document.querySelector("#listKelurahan")
        listKelurahan.innerHTML = allKelurahan

    } catch(e) {
        console.log(e)
    }
}

/* 
    1. Fetch API untuk dapat daftar provinsi saat load DOM telah selesai.
    2. Loop response untuk ditampilkan menjadi list option di input select provinsi.
*/
document.addEventListener('DOMContentLoaded', async () => {

    let provinsi = []

    try {
        provinsi = await loadApi('https://kodepos-2d475.firebaseio.com/list_propinsi.json')
        
        const selectProvinsi = document.querySelector("#provinsi")  

        Object.keys(provinsi).forEach(key => {
            const newOption = document.createElement('option')
            let optionText = document.createTextNode(provinsi[key])

            // set option text
            newOption.appendChild(optionText)
            // and option value
            newOption.setAttribute('value', key)
            // add the option to the select box
            selectProvinsi.appendChild(newOption)
        })
    } catch(e) {
        console.log(e)
    }
})

