document.addEventListener('DOMContentLoaded', function () {
    const encryptButton = document.querySelector('.encrypt-btn');
    const decryptButton = document.querySelector('.decrypt-btn');
    const copyButton = document.querySelector('.copy-btn');
    const clearButton = document.querySelector('.clear-btn');
    const outputContainer = document.getElementById('output-container');
    const ilustracion = document.querySelector('.ilustracion');
    const outputText = document.getElementById('output-text');

    const llaves = [["e","enter"], ["i","imes"], ["a","ai"], ["o","ober"], ["u","ufa"]];

    function replaceIlustracionWithText() {
        ilustracion.style.display = 'none';
        outputContainer.style.display = 'block';
    }

    function showIlustracion() {
        ilustracion.style.display = 'block';
        outputContainer.style.display = 'none';
    }

    function simpleEncrypt(text, key) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            charCode += key.length;
            result += String.fromCharCode(charCode);
        }
        return result;
    }

    function simpleDecrypt(text, key) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            charCode -= key.length;
            result += String.fromCharCode(charCode);
        }
        return result;
    }

    function encriptarMensaje(mensaje) {
        let mensajeEncriptado = "";
        for (let i = 0; i < mensaje.length; i++) {
            let letra = mensaje[i];
            let encriptada = letra;
            for (let j = 0; j < llaves.length; j++) {
                if (letra === llaves[j][0]) {
                    encriptada = llaves[j][1];
                    break;
                }
            }
            mensajeEncriptado += encriptada;
        }
        return mensajeEncriptado;
    }

    function desencriptarMensaje(mensaje) {
        let mensajeDesencriptado = mensaje;
        for (let i = 0; i < llaves.length; i++) {
            let regex = new RegExp(llaves[i][1], 'g');
            mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
        }
        return mensajeDesencriptado;
    }

    function encryptText() {
        const textarea = document.querySelector('textarea').value;
        const key = document.getElementById('key').value;

        if (key === '') {
            outputText.textContent = 'Error: Por favor, introduce una clave.';
            replaceIlustracionWithText();
            return;
        }

        const encryptedText = simpleEncrypt(encriptarMensaje(textarea), key);
        outputText.textContent = `Encriptado: ${encryptedText}`;
        replaceIlustracionWithText();
    }

    function decryptText() {
        const textarea = document.querySelector('textarea').value;
        const key = document.getElementById('key').value;

        if (key === '') {
            outputText.textContent = 'Error: Por favor, introduce una clave.';
            replaceIlustracionWithText();
            return;
        }

        const decryptedText = desencriptarMensaje(simpleDecrypt(textarea, key));
        outputText.textContent = `Desencriptado: ${decryptedText}`;
        replaceIlustracionWithText();
    }

    function clearText() {
        document.querySelector('textarea').value = '';
        document.getElementById('key').value = '';
        outputText.innerHTML = '<h3 class="subtitulo">Ningún mensaje fue encontrado</h3><p class="parrafo">Ingrese texto a encriptar o desencriptar</p>';
        showIlustracion();
    }

    function copyText() {
        const textToCopy = outputText.textContent.replace(/^Encriptado: |^Desencriptado: /, '');
        navigator.clipboard.writeText(textToCopy).then(() => {
            outputText.innerHTML = '<h3 class="subtitulo">Texto copiado con éxito</h3><p class="parrafo"></p>';
        }).catch(() => {
            outputText.innerHTML = '<h3 class="subtitulo">Error al copiar el texto</h3><p class="parrafo"></p>';
        });
    }

    encryptButton.addEventListener('click', encryptText);
    decryptButton.addEventListener('click', decryptText);
    clearButton.addEventListener('click', clearText);
    copyButton.addEventListener('click', copyText);
});
