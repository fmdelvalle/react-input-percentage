import React, {useCallback, useState} from 'react';

import './css/InputPercentage.css';

type InputPercentageProps = {
    value: string | null,   // Something like 99.99%
    onChange: (value: string | null) => void,   // Only triggered for valid values. Value will always have a dot as decimal point.
    className?: string,
    readOnly?: boolean,
    disabled?: boolean,
    decimals?: 0 | 1 | 2,
    decimal_point: '.' | ',',   // Only for display. We will be internally be using '.' or JS will mess the values.
    symbol?: string,     // Default '%', could be '', '$', etc.
    min?: number,    // It will not be allowed to be lower than this (0?)
    max?: number,    // It will not be allowed to be bigger than this (100?)
    step?: number   // Default 1%, could be .1, .01...
};

function escapeRegExp(s : string) : string {
    return s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export default function InputPercentage( Props: InputPercentageProps ) : JSX.Element {
    const [our_value,setOurValue] = useState<string>(Props.value || '');

    const symbol = Props.symbol === undefined ? '%' : Props.symbol;
    const regexp = new RegExp(escapeRegExp(symbol));
    const decimals = Props.decimals || 0;
    const step = Props.step || 1;

    /**
     * New value received. We store it in our local state, and maybe, if it can be converted to a valid number, we
     * call Props.onChange() with the value (as string)
     */
    const onSetValue = useCallback(( typed: string ) => {
        let value: string = typed.replace(regexp, '');
        let number: number = parseFloat(value);
        if( !isNaN(number)) {
            if( Props.max !== undefined && number > Props.max ) {
                number = Props.max;
                const upload = number.toFixed( decimals ) + symbol;
                setOurValue(upload);
                Props.onChange(upload);
            } else if( Props.min !== undefined && number < Props.min ) {
                number = Props.min;
                const upload = number.toFixed( decimals ) + symbol;
                setOurValue(upload);
                Props.onChange( upload );
            } else {
                setOurValue(typed);
                const upload = number.toFixed( decimals ) + symbol;
                Props.onChange(upload);
            }
        } else if( value == '') {
            setOurValue(typed);
            Props.onChange(null);
        }
    },[decimals, Props.max, Props.min, Props.onChange, setOurValue, symbol]);

    /**
     * When the user leaves the control we sanitize a bit. We don't do it in onChange() because adjusting values while
     * the user is typing is very annoying.
     */
    const onBlur = useCallback(() => {
        let number: number = parseFloat(our_value.replace( regexp,''));
        if( !isNaN(number)) {
            let upload: string = number.toFixed( decimals ) + symbol;
            if( upload != our_value ) {
                setOurValue(upload);
            }
        } else {
            // If we don't have a valid number, we switch to empty string.
            setOurValue('');
        }
    }, [our_value, onSetValue, regexp]);

    /**
     * The user is typing. We store the changes in our state, and maybe, if what we have is valid, we call Props.onChange()
     */
    const onChange = useCallback( e => {
        let typed = e.target.value.replace(Props.decimal_point, '.');
        onSetValue(typed);
    },[onSetValue, Props.decimal_point ]);

    /**
     * Arrow (up or down) pressed.
     */
    const onArrow = useCallback( (e: any, delta: number) => {
        let f = parseFloat(our_value.replace(regexp, ''));
        f += delta;
        onSetValue(f.toFixed( decimals ) + symbol);
    }, [our_value, onSetValue, symbol, Props.decimal_point]);

    return <div className={ (Props.className || '') + ' input-percentage' }>
        <input type='text' value={our_value.replace('.', Props.decimal_point)} onChange={onChange} disabled={Props.disabled} readOnly={Props.readOnly} onBlur={onBlur} />
        <div>
            <div className="arrow arrow-up" onClick={e => onArrow(e, step)} />
            <div className="arrow arrow-down" onClick={e => onArrow(e, -step)} />
        </div>
    </div>;
}