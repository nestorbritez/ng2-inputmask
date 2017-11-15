import { Directive, ElementRef, EventEmitter, HostListener, Input, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

var placeholders = {
    'A': '^[a-zA-ZA-zА-яЁё]',
    '0': '\\d'
};
var keys = {
    'BACKSPACE': 8,
    'LEFT': 37,
    'RIGHT': 39,
    'DEL': 46,
};
var InputMaskDirective = /** @class */ (function () {
    /**
     *
     * @param {?} element
     */
    function InputMaskDirective(element) {
        this.element = element;
        this.ngModelChange = new EventEmitter();
        this.state = {
            value: this.getValue()
        };
    }
    /**
     *
     * @return {?}
     */
    InputMaskDirective.prototype.onChange = function () {
        this.applyMask(this.getClearValue(this.getValue()));
    };
    /**
     *
     * @param {?} event
     * @return {?}
     */
    InputMaskDirective.prototype.onKeyPress = function (event) {
        var /** @type {?} */ key = this.getKey(event);
        if (key === keys.BACKSPACE || key === keys.LEFT || key === keys.RIGHT)
            return;
        var /** @type {?} */ cursorPosition = this.getCursorPosition();
        var /** @type {?} */ regexp = this.createRegExp(cursorPosition);
        if (regexp != null && !regexp.test(event.key) || this.getValue().length >= this.mask.length) {
            event.preventDefault();
        }
    };
    /**
     *
     * @param {?} event
     * @return {?}
     */
    InputMaskDirective.prototype.onKeyDown = function (event) {
        var /** @type {?} */ key = this.getKey(event);
        if ((key === keys.BACKSPACE || key === keys.DEL) && this.getClearValue(this.getValue()).length === 1) {
            this.setValue('');
            this.state.value = '';
            this.ngModelChange.emit('');
        }
    };
    /**
     *
     * @return {?}
     */
    InputMaskDirective.prototype.ngOnInit = function () {
        this.applyMask(this.getClearValue(this.getValue()));
    };
    /**
     *
     * @param {?} event
     * @return {?}
     */
    InputMaskDirective.prototype.getKey = function (event) {
        return event.keyCode || event.charCode;
    };
    /**
     *
     * @param {?} value
     * @return {?}
     */
    InputMaskDirective.prototype.applyMask = function (value) {
        var /** @type {?} */ newValue = '';
        var /** @type {?} */ maskPosition = 0;
        if (this.getClearValue(value).length > this.getClearValue(this.mask).length) {
            this.setValue(this.state.value);
            return;
        }
        for (var /** @type {?} */ i = 0; i < value.length; i++) {
            var /** @type {?} */ current = value[i];
            var /** @type {?} */ regexp = this.createRegExp(maskPosition);
            if (regexp != null) {
                if (!regexp.test(current)) {
                    this.setValue(this.state.value);
                    break;
                }
                newValue += current;
            }
            else if (this.mask[maskPosition] === current) {
                newValue += current;
            }
            else {
                newValue += this.mask[maskPosition];
                i--;
            }
            maskPosition++;
        }
        var /** @type {?} */ nextMaskElement = this.mask[maskPosition];
        if (value.length && nextMaskElement != null && /^[-\/\\^$#&@№:<>_\^!*+?.()|\[\]{}]/.test(nextMaskElement)) {
            newValue += nextMaskElement;
        }
        var /** @type {?} */ oldValue = this.state.value;
        var /** @type {?} */ cursorPosition = this.getCursorPosition();
        this.setValue(newValue);
        this.state.value = newValue;
        if (oldValue.length >= cursorPosition) {
            this.setCursorPosition(cursorPosition);
        }
    };
    /**
     *
     * @param {?} position
     * @return {?}
     */
    InputMaskDirective.prototype.createRegExp = function (position) {
        if (this.mask[position] == null) {
            return null;
        }
        var /** @type {?} */ currentSymbol = this.mask[position].toUpperCase();
        var /** @type {?} */ keys = Object.keys(placeholders);
        var /** @type {?} */ searchPosition = keys.indexOf(currentSymbol);
        if (searchPosition >= 0) {
            return new RegExp(placeholders[keys[searchPosition]], 'gi');
        }
        return null;
    };
    /**
     *
     * @return {?}
     */
    InputMaskDirective.prototype.getValue = function () {
        return this.element.nativeElement.value;
    };
    /**
     *
     * @param {?} value
     * @return {?}
     */
    InputMaskDirective.prototype.getClearValue = function (value) {
        return value.trim().replace(/[-\/\\^$#&@№:<>_\^!*+?.()|\[\]{}]/gi, '');
    };
    /**
     *
     * @param {?} value
     * @return {?}
     */
    InputMaskDirective.prototype.setValue = function (value) {
        this.element.nativeElement.value = value;
    };
    /**
     *
     * @return {?}
     */
    InputMaskDirective.prototype.getCursorPosition = function () {
        return this.element.nativeElement.selectionStart;
    };
    /**
     *
     * @param {?} start
     * @param {?=} end
     * @return {?}
     */
    InputMaskDirective.prototype.setCursorPosition = function (start, end) {
        if (end === void 0) { end = start; }
        this.element.nativeElement.setSelectionRange(start, end);
    };
    InputMaskDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mask]'
                },] },
    ];
    /**
     * @nocollapse
     */
    InputMaskDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    InputMaskDirective.propDecorators = {
        'mask': [{ type: Input },],
        'ngModelChange': [{ type: Output },],
        'onChange': [{ type: HostListener, args: ['input',] },],
        'onKeyPress': [{ type: HostListener, args: ['keypress', ['$event'],] },],
        'onKeyDown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
    };
    return InputMaskDirective;
}());

var InputMaskModule = /** @class */ (function () {
    function InputMaskModule() {
    }
    InputMaskModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule
                    ],
                    declarations: [
                        InputMaskDirective
                    ],
                    exports: [
                        InputMaskDirective
                    ]
                },] },
    ];
    /**
     * @nocollapse
     */
    InputMaskModule.ctorParameters = function () { return []; };
    return InputMaskModule;
}());

export { InputMaskModule, InputMaskDirective };
