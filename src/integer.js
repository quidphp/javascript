/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */

// integer
// methods related to integer numbers

// import
import { Arr, Num, Scalar } from '../index.js';

// export
export default {
    
    // is
    // retourne vrai si la valeur est un int
    is: function(value)
    {
        return Num.is(value) && parseInt(value) === value;
    },
    
    
    // cast
    // retourne le nombre sous forme de int
    cast: function(value)
    {
        return (Scalar.isNotBool(value) && value !== '')? parseInt(value):null;
    },
    
    
    // toBool
    // retourne un booléean à partir d'un int
    toBool: function(value)
    {
        let r = null;
        this.typecheck(value);
        
        if(value === 1)
        r = true;

        else if(value === 0)
        r = false;
        
        return r;
    },
    
    
    // toggle
    // toggle des valeurs primaires (1/0)
    toggle: function(value)
    {
        let r = null;
        this.typecheck(value);
        
        if(value === 1)
        r = 0;

        else if(value === 0)
        r = 1;

        return r;
    },
    
    
    // range
    // retourne un tableau range
    range: function(min,max,inc)
    {
        let r = null;
        min = (min == null)? 1:min;
        inc = (inc == null)? 1:inc;
        
        if(this.isPositive(min,true) && this.isPositive(max,true) && this.isPositive(inc))
        {
            const length = Math.floor((max - min) / inc) + 1;
            const arr = Array(length).fill(min);
            
            r = Arr.map(arr,function(x,y) {
                return x + y * inc;
            });
        }
        
        return r;
    },
    
    
    // unique
    // retourne un int jamais utilisé, utile pour générer des ids unique
    unique: (function(value)
    {
        let i = 0;
        return function() {
            return i++;
        };
    })()
}