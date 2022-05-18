/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/javascript/blob/master/LICENSE
 */

// env
// methods related to javascript environnement

// import
import { Arr, Obj } from '../index.js';

// export
export default {
    
    // isNode
    // retourne vrai si l'environnement courant est dans node
    isNode: function() 
    {
        return (typeof process !== 'undefined') && (typeof process.release !== 'undefined') && (process.release.name === 'node');
    },
    
    
    // isBrowser
    // retourne vrai si l'environnement courant est dans le navigateur
    isBrowser: function() 
    {
        return !this.isNode();
    },
    
    
    // isWindow
    // retourne vrai si la variable est un window ou un proxy
    isWindow: function(value) 
    {
        let r = false;
        
        if(this.isBrowser() && Obj.is(value))
        r = value instanceof Window || value.window === value;
        
        return r;
    },
    
    
    // isTarget
    // retourne vrai si la variable est est un target html
    // soit window, document, element, textNode, doctype
    isTarget: function(value) 
    {
        let r = false;
        
        if(this.isBrowser() && Obj.is(value))
        r = value instanceof HTMLElement || value instanceof HTMLTemplateElement || value instanceof DocumentFragment || value === document || this.isWindow(value) || Arr.in(value.nodeType,[Node.TEXT_NODE,Node.DOCUMENT_TYPE_NODE]);
        
        return r;
    }
}