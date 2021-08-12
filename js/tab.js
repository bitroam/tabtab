var info = document.getElementById("tab")

var tabs_array = []

chrome.tabs.query({}, function (tabArray) {
  for (const tabElement of tabArray) {
    item = {}
    item.id = tabElement.id
    item.windowId = tabElement.windowId
    item.favIconUrl = tabElement.favIconUrl
    item.title = tabElement.title
    item.url = tabElement.url
    tabs_array.push(item)
  }
  info.innerHTML = JSON.stringify(tabs_array)
})



