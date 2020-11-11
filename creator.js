class Create {
    /**
     * Create every HTML element
     * @param {string} [type = 'div']
     * @param {{}} [parameters = null]
     * @returns {HTMLElement}
     */
    static element(type='div', parameters = null) {
        var element = document.createElement(type);

        if (parameters != null) {
            for (var name in parameters) {
                var value = parameters[name];

                element.setAttribute(name, value);
            }
        }
        return element;
    }

    /**
     * (Old function) Create HTML element with text
     * @param {string} type 
     * @param {string} id 
     * @param {string} [classe=null]
     * @param {string} [text=null]
     * @param {string} [onclick=null]
     * @returns {HTMLElement}
     */
    static createBasicElement(type, id, classe = null, text = null, onclick = null) {
        var node = document.createElement(type);

        if (id != null) node.id = id;
        if (classe != null) node.classList = classe;
        if (onclick != null) node.setAttribute("onclick", onclick);
        if (text != null) node.innerHTML = text;

        return node;
    }

    /**
     * Create <img/> element
     * @param {string} id 
     * @param {string} classe 
     * @param {string} src 
     * @param {string} alt
     * @returns {HTMLElement} 
     */
    static createImgage(src, id, classe, alt) {
        var img = document.createElement("img");

        /* add attributes */
        if (id != null) img.id = id;
        if (classe != null) img.classList = classe;
        if (alt != null) img.setAttribute("alt", alt);

        img.src = src;
        return img; // return img element
    }

    static span(text, classe = null, id = null) {

        return this.create_element('span', id, classe, text);
    }

    static getAverageRGB(imgEl) {

        var blockSize = 5, // only visit every 5 pixels
            defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;
    
        if (!context) {
            return defaultRGB;
        }
    
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
        context.drawImage(imgEl, 0, 0);
    
        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */
            return defaultRGB;
        }
    
        length = data.data.length;
    
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }
    
        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);
    
        return rgb;
    }
}