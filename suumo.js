'use strict';

const handler = async () => {
  const es = document.getElementsByClassName('cassetteitem_detail-col1')
  const addresses = await getAllowedAddresses()

  for (let i = 0; i < es.length; i++) {
    const el = es[i]
    applyElement(el, addresses)
  }
}

const applyElement = (el, alloweds) => {
  const address = el.innerText
  if (checkAddress(address, alloweds)) {
    el.innerHTML = `<span style="color: blue;font-weight: bold">(OK)</span> ${address}`
  } else {
    el.innerHTML = `<span style="color: red;font-weight: bold">(NG)</span> ${address}`
  }
}

const checkAddress = (address, allowedAddresses) => {
  for (let i = 0; i < allowedAddresses.length; i++) {
    const a = allowedAddresses[i]
    if (address == a) {
      return true
    }
  }
  return false
}

const getAllowedAddresses = async () => {
  const data = await chrome.storage.local.get("addresses")
  return data.addresses
}

window.addEventListener('load', () => handler(), false);
window.addEventListener('input', () => handler());