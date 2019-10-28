module.exports= {
    normalizeErrors: function(errors){

        let errorsArray = [];

        for(let property in errors){
            if(errors.hasOwnProperty(property)){
                errorsArray.push({title: property, detail: errors[property].message})
            } 
        }
        return errorsArray;
    }, 
    normalizeErrorsofToken: function(errors){
        let errorsArray = [];

        for(let property in errors){
            if(errors.hasOwnProperty(property)){
                errorsArray.push({title: errors['name'] || 'Unknown Error!', detail: errors['message']})
                break;
            }
        }
        return errorsArray; 
    }
}