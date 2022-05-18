/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/javascript/blob/master/LICENSE
 */
 
// factory
// script with a method to create the objects with prototype

// export
export default function(prototype)
{
    const r = Object.create((prototype === true)? {}:(prototype || null));
    const args = Array.prototype.slice.call(arguments,1);
    Object.assign.apply(null,[r].concat(args));
    
    return r;
}