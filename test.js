function delay(n) {
    return new Promise(resolve => setTimeout(resolve, n*1000));
}

async function asyncPrint(value, n) {
    console.log('start');
    await delay(n);
    console.log(value);
}
asyncPrint('hello world', 2);

#navi > ul > li.h30.st3.selDep1