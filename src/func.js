/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/javascript/blob/master/LICENSE
 */
 
// handler
// script with methods related to functions

// import
import { Integer } from '../index.js';

// export
export default {
    
    // is
    // retourne vrai si la valeur est une fonction
    is: function(value) 
    {
        return typeof value === "function" && typeof value.nodeType !== "number";
    },
    
    
    // noop
    // retourne une fonction vide
    noop: function() 
    {
        return function() {};
    },
    
    
    // async
    // comme timeout, mais la durée est automatiquement 0
    async: function(func,context) 
    {
        return this.timeout(0,func,context);
    },
    
    
    // timeout
    // permet d'appeler une fois après un timeout
    // si timeout n'est pas integer, utlise 0
    // retourne le timeout
    timeout: function(delay,func,context) 
    {
        this.typecheck(func);
        
        if(!Integer.is(delay))
        delay = 0;
        
        return setTimeout(func.bind(context),delay);
    },
    
    
    // debounce
    // permet d'appeler une fonction une seule fois après le délai spécifié par le timeout
    // retourne une nouvelle fonction
    debounce: function(delay,func) 
    {
        Integer.typecheck(delay);
        this.typecheck(func);
        const $inst = this;
        let timeout;
        
        return function() {
            const $this = this;
            const args = arguments;
            
            if(timeout)
            clearTimeout(timeout);
            
            timeout = $inst.timeout(delay,function() {
                func.apply($this,args);
            });
        }
    },
    
    
    // debounceOnce
    // comme debounce mais la function ne pourra être appelé qu'une fois
    debounceOnce: function(delay,func)
    {
        let once = false;
        Func.typecheck(func);
        
        return this.debounce(delay,function() {
            const args = arguments;
            
            if(once === false)
            {
                func.apply(this,args);
                once = true;
            }
        });
    },
    
    
    // throttle
    // permet de limiter le rythme d'appel à une fonction
    // retourne une nouvelle fonction
    throttle: function(delay,func) 
    {
        Integer.typecheck(delay);
        this.typecheck(func);
        const $inst = this;
        let canCall = true;
        
        return function() {
            const $this = this;
            
            if(canCall === true)
            {
                func.apply($this,arguments);
                canCall = false;
                
                $inst.timeout(delay,function() {
                    canCall = true;
                });
            }
        }
    }
}