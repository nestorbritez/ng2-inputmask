import { ElementRef, OnInit, EventEmitter } from '@angular/core';
export declare class InputMaskDirective implements OnInit {
    private element;
    private state;
    mask: any;
    ngModelChange: EventEmitter<{}>;
    /**
     *
     * @param element
     * @param model
     */
    constructor(element: ElementRef);
    /**
     *
     */
    onChange(): void;
    /**
     *
     * @param event
     */
    onKeyPress(event: any): void;
    /**
     *
     * @param event
     */
    onKeyDown(event: any): void;
    /**
     *
     */
    ngOnInit(): void;
    /**
     *
     * @param event
     * @returns {number}
     */
    private getKey(event);
    /**
     *
     * @param value
     */
    private applyMask(value);
    /**
     *
     * @param position
     * @returns {any}
     */
    private createRegExp(position);
    /**
     *
     * @returns {any}
     */
    private getValue();
    /**
     *
     * @param value
     * @returns {string}
     */
    private getClearValue(value);
    /**
     *
     * @param value
     */
    private setValue(value);
    /**
     *
     * @returns {number}
     */
    private getCursorPosition();
    /**
     *
     * @param start
     * @param end
     */
    private setCursorPosition(start, end?);
}
