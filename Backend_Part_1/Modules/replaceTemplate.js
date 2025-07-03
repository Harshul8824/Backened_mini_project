   module.exports = function(temp, product){   //in this func we replace the placeholder with api data  temp -> string coming from temoCard  product ->api in json form
       let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
       output = output.replace(/{%PRODUCTDESCRIPTION%}/g, product.description);
       output = output.replace(/{%PRICE%}/g, product.price);
       output = output.replace(/{%QUANTITY%}/g, product.quantity);
       output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
       output = output.replace(/{%FROM%}/g, product.from);
       output = output.replace(/{%IMAGE%}/g, product.image);
       output = output.replace(/{%ID%}/g, product.id);

        if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');  //The g (global) flag tells JavaScript to: Replace all occurrences of the pattern in the string, not just the first one.
      return output;
   }