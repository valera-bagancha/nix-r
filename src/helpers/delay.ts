export const delay = () => new Promise((resovle) => {
    setTimeout(() => {
      resovle(true)
    }, 3000)
  })