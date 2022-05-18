/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */
 
// arrLike
// script with some functions related to array like management

// import
import { Arr, Env, Func, Scalar, Vari } from '../index.js';

// export
export default {
    
    // is
    // retourne vrai si la variable est comme un tableau (array-like)
    // retourne faux si la valeur est un array
    is: function(value)
    {
        let r = false;
        
        if(!Arr.is(value) && !Scalar.is(value) && !Func.is(value) && !Env.isWindow(value))
        {
            const type = Vari.type(value);
            const length = !!value && "length" in value && value.length;
            r = type === 'array' || length === 0 || typeof length === "number" && length > 0 && (length - 1) in value;
        }
        
        return r;
    },
    
    
    // toArray
    // retourne la même valeur si c'est un tableau, sinon converti le array like
    // moins stricte que le toArray de obj
    toArray: function(value) 
    {
        return Arr.is(value)? value:(this.is(value) ? Array.from(value):null);
    }
}