 const getCategoryEnglish = category =>{
    if(category==='فلة') return 'villa'
    else  if(category==='شقة') return 'appartment'
    else  if(category==='أرض') return 'land'
    else  if(category==='بيت') return 'house'
    else return 'otherTypes'
}

export default {
    getCategoryEnglish
}