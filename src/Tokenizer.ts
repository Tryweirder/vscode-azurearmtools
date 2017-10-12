// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------

import * as utilities from "./Utilities";

/**
 * The different types of tokens that can be generated by a basic Tokenizer.
 */
export const enum TokenType {
    LeftCurlyBracket,
    RightCurlyBracket,
    LeftSquareBracket,
    RightSquareBracket,
    LeftParenthesis,
    RightParenthesis,
    Underscore,
    Period,
    Dash,
    Plus,
    Comma,
    Colon,
    SingleQuote,
    DoubleQuote,
    Backslash,
    ForwardSlash,
    Asterisk,
    Space,
    Tab,
    NewLine,
    CarriageReturn,
    CarriageReturnNewLine,
    Letters,
    Digits,
    Unrecognized
}

/**
 * An individual Token that has been parsed by a basic Tokenizer.
 */
export class Token {
    constructor(private _text: string, private _type: TokenType) {
    }

    /**
     * Get the string representation of this token.
     */
    public toString(): string {
        return this._text;
    }

    /**
     * Get the number of characters that make up this token.
     */
    public length(): number {
        return this._text.length;
    }

    /**
     * Get the type of this token.
     */
    public getType(): TokenType {
        return this._type;
    }
}

export const LeftCurlyBracket = new Token("{", TokenType.LeftCurlyBracket);
export const RightCurlyBracket = new Token("}", TokenType.RightCurlyBracket);
export const LeftSquareBracket = new Token("[", TokenType.LeftSquareBracket);
export const RightSquareBracket = new Token("]", TokenType.RightSquareBracket);
export const LeftParenthesis = new Token("(", TokenType.LeftParenthesis);
export const RightParenthesis = new Token(")", TokenType.RightParenthesis);
export const Underscore = new Token("_", TokenType.Underscore);
export const Period = new Token(".", TokenType.Period);
export const Dash = new Token("-", TokenType.Dash);
export const Plus = new Token("+", TokenType.Plus);
export const Comma = new Token(",", TokenType.Comma);
export const Colon = new Token(":", TokenType.Colon);
export const SingleQuote = new Token(`'`, TokenType.SingleQuote);
export const DoubleQuote = new Token(`"`, TokenType.DoubleQuote);
export const Backslash = new Token("\\", TokenType.Backslash);
export const ForwardSlash = new Token("/", TokenType.ForwardSlash);
export const Asterisk = new Token("*", TokenType.Asterisk);
export const Space = new Token(" ", TokenType.Space);
export const Tab = new Token("\t", TokenType.Tab);
export const NewLine = new Token("\n", TokenType.NewLine);
export const CarriageReturn = new Token("\r", TokenType.CarriageReturn);
export const CarriageReturnNewLine = new Token("\r\n", TokenType.CarriageReturnNewLine);

/**
 * Create a Letters Token from the provided text.
 */
export function Letters(text: string): Token {
    return new Token(text, TokenType.Letters);
}

/**
 * Create a Digits Token from the provided text.
 */
export function Digits(text: string): Token {
    return new Token(text, TokenType.Digits);
}

/**
 * Create an Unrecognized Token from the provided text.
 */
export function Unrecognized(text: string): Token {
    return new Token(text, TokenType.Unrecognized);
}

/**
 * A Tokenizer that breaks a provided text string into a sequence of basic Tokens.
 */
export class Tokenizer implements utilities.Iterator<Token> {
    private _textLength: number;
    private _textIndex: number = -1;

    private _currentToken: Token;

    constructor(private _text: string) {
        this._textLength = _text ? _text.length : 0;
    }

    /**
     * Get whether this Tokenizer has started tokenizing its text string.
     */
    public hasStarted(): boolean {
        return 0 <= this._textIndex;
    }

    /**
     * Get the current Token that this Tokenizer has parsed from the source text. If this Tokenizer
     * hasn't started parsing the source text, or if it has parsed the entire source text, then this
     * will return undefined.
     */
    public current(): Token {
        return this._currentToken;
    }

    /**
     * Get the current character that this Tokenizer is pointing at.
     */
    private get currentCharacter(): string {
        return 0 <= this._textIndex && this._textIndex < this._textLength ? this._text[this._textIndex] : undefined;
    }

    /**
     * Move this Tokenizer to the next character in its source text.
     */
    private nextCharacter(): void {
        ++this._textIndex;
    }

    /**
     * Move this Tokenizer to the next Token in the source text string.
     */
    public moveNext(): boolean {
        if (!this.hasStarted()) {
            this.nextCharacter();
        }

        if (!this.currentCharacter) {
            this._currentToken = undefined;
        }
        else {
            switch (this.currentCharacter) {
                case "{":
                    this._currentToken = LeftCurlyBracket;
                    this.nextCharacter();
                    break;

                case "}":
                    this._currentToken = RightCurlyBracket;
                    this.nextCharacter();
                    break;

                case "[":
                    this._currentToken = LeftSquareBracket;
                    this.nextCharacter();
                    break;

                case "]":
                    this._currentToken = RightSquareBracket;
                    this.nextCharacter();
                    break;

                case "(":
                    this._currentToken = LeftParenthesis;
                    this.nextCharacter();
                    break;

                case ")":
                    this._currentToken = RightParenthesis;
                    this.nextCharacter();
                    break;

                case "_":
                    this._currentToken = Underscore;
                    this.nextCharacter();
                    break;

                case ".":
                    this._currentToken = Period;
                    this.nextCharacter();
                    break;

                case "-":
                    this._currentToken = Dash;
                    this.nextCharacter();
                    break;

                case "+":
                    this._currentToken = Plus;
                    this.nextCharacter();
                    break;

                case ",":
                    this._currentToken = Comma;
                    this.nextCharacter();
                    break;

                case ":":
                    this._currentToken = Colon;
                    this.nextCharacter();
                    break;

                case `'`:
                    this._currentToken = SingleQuote;
                    this.nextCharacter();
                    break;

                case `"`:
                    this._currentToken = DoubleQuote;
                    this.nextCharacter();
                    break;

                case "\\":
                    this._currentToken = Backslash;
                    this.nextCharacter();
                    break;

                case "/":
                    this._currentToken = ForwardSlash;
                    this.nextCharacter();
                    break;

                case "*":
                    this._currentToken = Asterisk;
                    this.nextCharacter();
                    break;

                case "\n":
                    this._currentToken = NewLine;
                    this.nextCharacter();
                    break;

                case "\r":
                    this.nextCharacter();
                    if (this.currentCharacter.toString() === "\n") {
                        this._currentToken = CarriageReturnNewLine;
                        this.nextCharacter();
                    }
                    else {
                        this._currentToken = CarriageReturn;
                    }
                    break;

                case " ":
                    this._currentToken = Space;
                    this.nextCharacter();
                    break;

                case "\t":
                    this._currentToken = Tab;
                    this.nextCharacter();
                    break;

                default:
                    if (isLetter(this.currentCharacter)) {
                        this._currentToken = Letters(this.readWhile(isLetter));
                    }
                    else if (isDigit(this.currentCharacter)) {
                        this._currentToken = Digits(this.readWhile(isDigit));
                    }
                    else {
                        this._currentToken = Unrecognized(this.currentCharacter);
                        this.nextCharacter();
                    }
                    break;
            }
        }

        return !!this._currentToken;
    }

    /**
     * Read and return a sequence of characters from the source text that match the provided
     * condition function.
     */
    private readWhile(condition: (character: string) => boolean): string {
        let result: string = this.currentCharacter;
        this.nextCharacter();

        while (this.currentCharacter && condition(this.currentCharacter)) {
            result += this.currentCharacter;
            this.nextCharacter();
        }

        return result;
    }
}

/**
 * Get whether the provided character is a letter or not.
 */
function isLetter(character: string): boolean {
    return ("a" <= character && character <= "z") || ("A" <= character && character <= "Z");
}

/**
 * Get whether the provided character is a digit or not.
 */
function isDigit(character: string): boolean {
    return "0" <= character && character <= "9";
}