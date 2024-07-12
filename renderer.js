const $ = selector => document.querySelector(selector)

if (window.API) {
  window.API.onUpdateTheme((event, theme) => {
    const root = document.documentElement
    console.log({ event }) // Uncomment the console.log statement
    root.style.setProperty('--scheme', theme)
  })
} else {
  console.warn('electronAPI is not defined')
}

