import readline from 'readline';
import JSDom from 'jsdom';

/**
 * @thankyou Bergi
 * @param {string} js - Code to execute.
 * @param {*} contextAsScope - Whatever scope you wish, don't confuse "this" and "scope"
 * @returns {any}
 */
function evalInScope(js, contextAsScope) {
    return Function(`with (this) { return ${js} }`).call(contextAsScope);
}

const options = {
    url: 'http://127.0.0.1/playcanvas-node/',
    runScripts: "dangerously",
    pretendToBeVisual: true,
    resources: "usable",
    cors: false,
};

JSDom.JSDOM.fromFile("example.html", options).then(dom => {
    // const window = dom.window;
    // const document = dom.window.document;
    const context = dom.getInternalVMContext();
    // console.log(dom.serialize());
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    // console.log("context.pc" + context.pc);
    function repl() {
        rl.question('>', (code) => {
            try {
                const ret = evalInScope(code, context);
                console.log(ret);
            } catch (e) {
                console.error(e);
            }
            repl();
        });
    } 
    repl();
});
