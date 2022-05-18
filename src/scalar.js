/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */
 
// scalar
// script with functions related to scalar values

// import
import { Arr, Bool, Integer, Num } from '../index.js';

// export
export default {    
    
    // is
    // retourne vrai si la valeur est scalar
    is: function(value) 
    {
        let r = false;
        const type = typeof value;
        
        if(type === 'boolean' || type === 'number' || type === 'string')
        r = true;
        
        return r;
    },
    
    
    // isNotBool
    // retourne vrai si scalar mais pas bool
    isNotBool: function(value)
    {
        return this.is(value) && !Bool.is(value);
    },
    
    
    // cast
    // permet de cast une valeur selon un type donné en deuxième argument
    cast: function(r,type)
    {
        if(r != null && type != null)
        {
            if(Arr.in(type,[true,'json']))
            r = Json.decode(r);
            
            else if(type === 'int')
            r = Integer.cast(r);
            
            else if(type === 'num')
            r = Num.cast(r);
            
            else if(type === 'bool' && this.is(r))
            r = this.toBool(r);
        }
        
        return r;
    },
    
    
    // toBool
    // retourne un booléean à partir d'un scalar
    toBool: function(value)
    {
        let r = null;
        this.typecheck(value);
        
        if(Arr.in(value,[1,'1',true,'true']))
        r = true;

        else if(Arr.in(value,[0,'0',false,'false']))
        r = false;
        
        return r;
    }
}