function sessionStorageSet(key,value){sessionStorage.setItem(key,JSON.stringify(value))}function sessionStorageGet(key){var result=JSON.parse(sessionStorage.getItem(key));return result}function sessionStrageRemove(key){sessionStorage.removeItem(key)}