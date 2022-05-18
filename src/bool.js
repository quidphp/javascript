/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */
 
// bool
// methods for bool primitive type

// export
export default {
    
    // is
    // retourne vrai si la valeur est une fonction
    is: function(value) 
    {
        return typeof(value) === 'boolean';
    },
    
    
    // toInt
    // retourne un numéro à partir d'un boolean
    toInt: function(value)
    {
        let r = null;
        this.typecheck(value);
        
        if(value === true)
        r = 1;

        else if(value === false)
        r = 0;

        return r;
    },
    
    
    // toggle
    // permet de faire un toggle sur une valeur boolean
    toggle: function(value)
    {
        let r = null;
        this.typecheck(value);
        
        if(value === true)
        r = false;

        else if(value === false)
        r = true;

        return r;
    }
}