const delay = (ms) => {
    return new Promise((resole) =>
        setTimeout(() => {
            resolve(ms)
        }, ms)
    )
}

const main2 = async () => {
    const result = await delay(1000)

}