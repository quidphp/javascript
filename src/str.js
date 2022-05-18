/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */
 
// str
// script with a set of helper functions related to strings

// import
import { Arr, Html, Integer, Json, Num, Obj, Pojo } from '../index.js';

// export
export default {
    
    // is
    // retourne vrai si la valeur est une string
    is: function(value) 
    {
        return typeof(value) === 'string';
    },

    
    // isStart
    // retourne vrai si la string commence par needle
    isStart: function(needle,value)
    {
        return (this.is(needle) && this.is(value))? value.startsWith(needle):null;
    },


    // isEnd
    // retourne vrai si la string finit par needle
    isEnd: function(needle,value)
    {
        return (this.is(needle) && this.is(value))? value.endsWith(needle):null;
    },

    
    // isEqual
    // retourne vrai si les deux valeurs sont égales si comparés comme string
    isEqual: function(value,value2)
    {
        return this.cast(value) === this.cast(value2);
    },
    
    
    // in
    // retourne vrai si la valeur est dans la string
    // retourne un boolean
    in: function(value,string) 
    {
        return (this.is(string) && this.is(value))? string.includes(value):null;
    },
    
    
    // icompare
    // compare deux string de façon insensible à la case
    icompare: function(value,value2)
    {
        return (this.is(value) && this.is(value2))? (value.toUpperCase() === value2.toUpperCase()):false
    },
    
    
    // cast
    // retourne une valeur string
    // si la valeur est null retourne ''
    // si la valeur est objet, et que json est true -> envoie à json encode
    cast: function(value,json)
    {
        let r = '';
        
        if(value != null)
        {
            if(Obj.is(value) && json === true)
            r = Json.encode(value);                
            
            else
            r = String(value)
        }
        
        return r;
    },
    
    
    // toNum
    // retourne la string sous forme de nombre
    toNum: function(value) 
    {
        this.typecheck(value);
        return Num.cast(value);
    },
    
    
    // toInt
    // retourne la string sous forme de integer
    toInt: function(value) 
    {
        this.typecheck(value);
        return Integer.cast(value);
    },
    
    
    // pos
    // retourne l'index de la valeur dans la string
    pos: function(value,string) 
    {
        this.typecheck(string);
        let r = string.indexOf(value);
        r = (r === -1)? null:r;
        
        return r;
    },
    
    
    // lower
    // retourne la chaîne en lower case
    lower: function(value)
    {
        this.typecheck(value);
        return value.toLowerCase();
    },
    
    
    // lowerFirst
    // met la première lettre de la string lowercase
    lowerFirst: function(value)
    {
        this.typecheck(value);
        return (this.isNotEmpty(value))? value.charAt(0).toLowerCase() + value.slice(1):null;
    },
    
    
    // upper
    // retourne la chaîne en uppercase
    upper: function(value)
    {
        this.typecheck(value);
        return value.toUpperCase();
    },
    
    
    // upperFirst
    // met la première lettre de la string uppercase
    upperFirst: function(value)
    {
        this.typecheck(value);
        return (this.isNotEmpty(value))? value.charAt(0).toUpperCase() + value.slice(1):null;
    },

    
    // trim
    // trim une string
    trim: function(value)
    {
        this.typecheck(value);
        return value.trim();
    },
    
    
    // quote
    // permet d'enrobber une string dans des quotes
    // possible de spécifier double ou non
    // possible de faire un escape html
    quote: function(value,double,escape)
    {
        let r = null;
        this.typecheck(value);
        const quote = (double === true)? '"':"'";
        
        if(escape === true)
        value = Html.escape(value);
        
        r = quote+value+quote;
        
        return r;
    },
    
    
    // sub
    // retourne une nouvelle sous chaîne
    sub: function(start,end,string)
    {
        this.typecheck(string);
        Integer.typecheck(start);
        return string.substring(start,(end === true)? undefined:end);
    },
    
    
    // excerpt
    // retourne une nouvelle sous chaîne
    // peut ajouter un suffix si la chaîne a été coupé
    excerpt: function(limit,string,suffix)
    {
        let r = this.sub(0,limit,string);
        
        if(r !== string && this.isNotEmpty(suffix))
        r += suffix;
        
        return r;
    },
    
    
    // explode
    // explode une chaîne
    // retourne un tableau dans tous les cas
    explode: function(delimiter,value,clean)
    {
        this.typechecks([delimiter,value]);
        let r = value.split(delimiter);
        
        if(clean === true)
        r = Arr.clean(r);
        
        return r;
    },
    
    
    // explodeIndex
    // split une string et retourne l'index demandé en premier argument
    explodeIndex: function(index,delimiter,value)
    {
        let r = undefined;
        const x = this.explode(delimiter,value);
        
        if(Integer.is(index) && this.isNotEmpty(x[index]))
        r = x[index];
        
        return r;
    },
    
    
    // removeAllWhitespace
    // enlève tous les espaces blancs d'une string
    removeAllWhitespace: function(string)
    {
        this.typecheck(string);
        return string.replace(/\s/g, "");
    },
    
    
    // fromCamelCase
    // transforme une string camelcase vers une string avec séparateur
    fromCamelCase: function(delimiter,string)
    {
        this.typecheck(delimiter);
        string = this.trim(string);
        
        return string.replace(/[\w]([A-Z])/g, function(value) {
           return value[0] + delimiter + value[1];
        }).toLowerCase();
    },
    
    
    // toCamelCase
    // transforme une string avec séparateur en camelCase
    toCamelCase: function(delimiter,string)
    {
        let r = null;
        const $inst = this;
        string = this.trim(string);
        let array = this.explode(delimiter,string,true);
        
        array = Arr.map(array,function(word,index) {
            return (index == 0)? $inst.lower(word):$inst.upperFirst(word);
        });
        
        r = array.join('');
        r = this.removeAllWhitespace(r);
        
        return r;
    },
    
    
    // slug
    // transforme une string en slug
    slug: function(string)
    {
        string = this.lower(string);
        return string.replace(/ /g,'-').replace(/[^\w-]+/g,'').replace(/--/g,'-');
    },
    
    
    // keepNumber
    // enleve tous les caractères non numérique
    keepNumber: function(string)
    {
        this.typecheck(string);
        return string.replace(/[^0-9]/g,'');
    },
    
    
    // replace
    // permet de remplacer le contenu d'une string via un pojo
    replace: function(pojo,string)
    {
        this.typecheck(string);
        
        Pojo.each(pojo,function(value,key) {
            string = string.replace(key,value);
        });
        
        return string;
    }
}