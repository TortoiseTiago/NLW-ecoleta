function populateUF() {
  const ufSelect = document.querySelector('select[name=UF]')

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => { return res.json() })
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}
populateUF()

function getCity(event) {
  const citySelect = document.querySelector('select[name=city]')
  let stateInput = document.querySelector('input[name=state]')

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione o Municipio</option>"
  citySelect.disabled = true

  fetch(url)
    .then((res) => { return res.json() })
    .then(cities => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled = false
    })
}

document
  .querySelector('select[name=UF]')
  .addEventListener("change", getCity)


// items selecionados na coleta

const itemsToColect = document.querySelectorAll('.items-grid li')

for (const item of itemsToColect) {
  item.addEventListener("click", handleSelectedItem)
}

const colectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  // addadd or remove class
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  //verificar se tem itens selecionados
  //se sim, pegar os itens selecionados
  const alredSelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId // isso sera true ou false
    return itemFound
  })
  //se ja estiver selecionado
  if (alredSelected >= 0) {
    //tirar da seleção
    const filteredItems = selectedItems.filter(item => {
      const itemIsDiferent = item != itemId //false
      return itemIsDiferent
    })
    selectedItems = filteredItems
  } else { // se não estiver selecionado, adicionar a seleção
    selectedItems.push(itemId)
  }

  //atualizar o campo hidden com os valores
  colectedItems.value = selectedItems
}
