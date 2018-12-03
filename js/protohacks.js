// Some hacks to attach DOM Node class functions

/** 
 * if this node has a specified class
 * @param {String}
 * @returns {Boolean}
 * */
HTMLElement.prototype.hasClass = function(c) {
    if (this.classList) {
        return this.classList.contains(c);
    }
    return !!this.className.match(new RegExp('(\\s|^)' + c + '(\\s|$)'));
}
/** 
 * add a class to a node if it does not yet exist
 * @param {String}
 * @returns {Void}
 * */
HTMLElement.prototype.addClass = function(c) {
    if (this.classList) {
        this.classList.add(c);
    }else{
        if (!this.hasClass(c)) {
            this.className += c;
        }
    }
}
/** 
 * removes a class from the list in a node
 * @param {String}
 * @returns {Void}
 * */
HTMLElement.prototype.removeClass = function(c) {
    if (this.classList) {
        this.classList.remove(c);
    }else{
        if (this.hasClass(c)) {
            var reg = new RegExp('(\\s|^)' + c + '(\\s|$)');
            this.className=this.className.replace(reg, ' ');
        }
    }
}